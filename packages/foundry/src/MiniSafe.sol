// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
contract MiniSafe is ERC20, ReentrancyGuard {

    struct TokenBalance {
        uint256 celoBalance;
        uint256 cUsdBalance;
        uint256 depositTime;
        uint256 tokenIncentive;
    }

    mapping(address => TokenBalance) public balances;
    mapping(address => address) public upliners;
    mapping(address => address[]) public downliners;
    uint256 public lockDuration = 1 weeks;
    address public constant CELO_TOKEN_ADDRESS = address(0);
    address public constant CUSD_TOKEN_ADDRESS =
       0x874069fa1eb16d44d622f2e0ca25eea172369bc1; // 0x765DE816845861e75A25fCA122bb6898B8B1282a
    bool public due = false;

    constructor() ERC20("miniSafeToken", "MST") {
        _mint(address(this), 21000000 * 1e18);
    }

    event Deposited(
        address indexed depositor,
        uint256 amount,
        address indexed token
    );
    event Withdrawn(
        address indexed withdrawer,
        uint256 amount,
        address indexed token
    );
    event TimelockBroken(address indexed breaker, uint256 totalSavings);
    event UplinerSet(address indexed user, address indexed upliner);
    event RewardDistributed(
        address indexed upliner,
        address indexed depositor,
        uint256 amount
    );

    receive() external payable {
        deposit(CELO_TOKEN_ADDRESS, msg.value);
    }

    function setUpliner(address upliner) public {
        require(upliner != address(0), "Upliner cannot be the zero address");
        require(
            upliner != msg.sender,
            "You cannot set yourself as your upliner"
        );
        require(upliners[msg.sender] == address(0), "Upliner already set");
        upliners[msg.sender] = upliner;
        downliners[upliner].push(msg.sender);
        emit UplinerSet(msg.sender, upliner);
    }

    function getDownliners(
        address upliner
    ) public view returns (address[] memory) {
        return downliners[upliner];
    }

    function deposit(address tokenAddress, uint256 amount) public nonReentrant payable {
        if (tokenAddress == CELO_TOKEN_ADDRESS) {
            require(amount > 0, "CELO deposit amount must be greater than 0");
            TokenBalance storage celoBalance = balances[msg.sender];
            celoBalance.celoBalance += amount;
            celoBalance.depositTime = block.timestamp;
            celoBalance.tokenIncentive = balanceOf(msg.sender);
            emit Deposited(msg.sender, amount, CELO_TOKEN_ADDRESS);
        } else if (tokenAddress == CUSD_TOKEN_ADDRESS) {
            IERC20 cUsdToken = IERC20(CUSD_TOKEN_ADDRESS);
            require(
                cUsdToken.transferFrom(msg.sender, address(this), amount),
                "Transfer failed. Make sure to approve the contract to spend the cUSD tokens."
            );
            TokenBalance storage cUsdBalance = balances[msg.sender];
            cUsdBalance.cUsdBalance += amount;
            cUsdBalance.depositTime = block.timestamp;
            emit Deposited(msg.sender, amount, CUSD_TOKEN_ADDRESS);
        } else {
            revert("Unsupported token");
        }
        _mint(msg.sender, 1);
        TokenBalance storage tokenIncentive = balances[msg.sender];
        tokenIncentive.tokenIncentive += 1;

        distributeReferralReward(msg.sender, 1);
    }

    function distributeReferralReward(
        address depositor,
        uint256 amount
    ) internal {
        address upliner = upliners[depositor];
        if (upliner != address(0)) {
            uint256 uplinerReward = (amount * 10) / 100;
            _mint(upliner, uplinerReward);
            emit RewardDistributed(upliner, depositor, uplinerReward);
        }
    }

    function timeSinceDeposit(address depositor) public view returns (uint256) {
        return block.timestamp - balances[depositor].depositTime;
    }

    function breakTimelock(address tokenAddress) external nonReentrant payable {
        require(
            (balances[msg.sender].celoBalance > 0 ||
                balances[msg.sender].cUsdBalance > 0),
            "No savings to withdraw"
        );

        TokenBalance storage tokenBalance = balances[msg.sender];
        uint256 amount;
        if (timeSinceDeposit(msg.sender) < lockDuration) {
            due = true;
            uint256 tokenIncentive = tokenBalance.tokenIncentive;
            require(
                tokenIncentive >= 1,
                "Insufficient savings to break timelock"
            );

            if (tokenAddress == CELO_TOKEN_ADDRESS) {
                require(
                    due == true,
                    "Cannot withdraw before lock duration or no tokens deposited"
                );
                amount = tokenBalance.celoBalance;
                tokenBalance.celoBalance = 0;
                (bool success, ) = payable(msg.sender).call{value: amount}("");
                require(success, "CELO transfer failed");
            } else if (tokenAddress == CUSD_TOKEN_ADDRESS) {
                require(
                    due == true,
                    "Cannot withdraw before lock duration or no tokens deposited"
                );
                amount = tokenBalance.cUsdBalance;
                tokenBalance.cUsdBalance = 0;
                IERC20 cUsdToken = IERC20(CUSD_TOKEN_ADDRESS);
                require(
                    cUsdToken.transfer(msg.sender, amount),
                    "cUSD transfer failed"
                );
            } else {
                revert("Unsupported token");
            }

            transferFrom(msg.sender, address(0), tokenIncentive);

            emit TimelockBroken(msg.sender, 1);
        }
    }

    function withdraw(address tokenAddress) external nonReentrant {
        TokenBalance storage tokenBalance = balances[msg.sender];
        if (
            (tokenBalance.celoBalance > 0 &&
                timeSinceDeposit(msg.sender) >= lockDuration) ||
            (tokenBalance.cUsdBalance > 0 &&
                timeSinceDeposit(msg.sender) >= lockDuration)
        ) {
            due = true;
        } else {
            revert(
                "Cannot withdraw before lock duration or no tokens deposited"
            );
        }
        uint256 amount;

        if (tokenAddress == CELO_TOKEN_ADDRESS) {
            amount = tokenBalance.celoBalance;
            tokenBalance.celoBalance = 0;
            payable(msg.sender).transfer(amount);
        } else if (tokenAddress == CUSD_TOKEN_ADDRESS) {
            amount = tokenBalance.cUsdBalance;
            tokenBalance.cUsdBalance = 0;
            IERC20 cUsdToken = IERC20(CUSD_TOKEN_ADDRESS);
            require(cUsdToken.transfer(msg.sender, amount), "Transfer failed");
        } else {
            revert("Unsupported token");
        }

        emit Withdrawn(msg.sender, amount, tokenAddress);
    }

    function getBalance(
        address account,
        address tokenAddress
    ) public view returns (uint256) {
        TokenBalance storage tokenBalance = balances[account];
        if (tokenAddress == CELO_TOKEN_ADDRESS) {
            return tokenBalance.celoBalance;
        } else if (tokenAddress == CUSD_TOKEN_ADDRESS) {
            return tokenBalance.cUsdBalance;
        } else {
            revert("Unsupported token");
        }
    }
}
