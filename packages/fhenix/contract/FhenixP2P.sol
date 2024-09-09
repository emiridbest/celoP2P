// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ISP} from "@ethsign/sign-protocol-evm/src/interfaces/ISP.sol";
import {Attestation} from "@ethsign/sign-protocol-evm/src/models/Attestation.sol";
import {DataLocation} from "@ethsign/sign-protocol-evm/src/models/DataLocation.sol";
import "@fhenixprotocol/contracts/FHE.sol";
import {FHERC20} from "@fhenixprotocol/contracts/experimental/token/FHERC20/FHERC20.sol";
import {FHE, euint32, euint32} from "@fhenixprotocol/contracts/FHE.sol";

contract AttestedCeloP2P is FHERC20, ReentrancyGuard, Ownable {
    ISP public spInstance;
    uint64 public schemaId;

    enum Fiat {
        NGN, // Nigerian Naira
        KSH, // Kenyan Shilling
        UGX, // Ugandan Shilling
        GHS // Ghanaian Cedi
    }

    struct Order {
        uint256 id;
        euint128 amount;
        euint256 price;
        euint256 accountNumber;
        string bank;
        string[] messages;
        bool isActive;
        bool isComplete;
        address seller;
        address buyer;
        Fiat fiatCurrency;
        bool isAttested;
    }

    Order[] public sellOrders;
    Order[] public buyOrders;

    mapping(uint256 => Order) public sellOrder;
    mapping(uint256 => Order) public buyOrder;

    mapping(address => euint256) public tokenIncentive;
    mapping(address => address) public upliners;
    mapping(address => address[]) public downliners;

    modifier onlySeller(uint256 _id, bool isSellOrder) {
        require(
            msg.sender ==
                (isSellOrder ? sellOrders[_id].seller : buyOrders[_id].seller),
            "Unauthorized action"
        );
        _;
    }

    modifier onlyBuyer(uint256 _id, bool isSellOrder) {
        require(
            msg.sender ==
                (isSellOrder ? sellOrders[_id].buyer : buyOrders[_id].buyer),
            "Unauthorized action"
        );
        _;
    }

    error AttestationWrongAttester();
    error ReleaseUnsuccesful();

    event OrderCreated(uint256 id, bool isSellOrder, address indexed creator);
    event OrderCancelled(uint256 id, bool isSellOrder);
    event OrderCompleted(uint256 id, bool isSellOrder);
    event UplinerSet(address indexed user, address indexed upliner);
    event RewardDistributed(
        address indexed upliner,
        address indexed depositor,
        uint256 amount
    );
    event AssetReleased(
        address indexed seller,
        address indexed buyer,
        euint128 amount
    );

    constructor() FHERC20("CeloP2P", "CPT") Ownable(_msgSender()) {
        _mint(address(this), 21000000 * 1e18);
    }

    function setSPInstance(address instance) external onlyOwner {
        spInstance = ISP(instance);
    }

    function setSchemaID(uint64 schemaId_) external onlyOwner {
        schemaId = schemaId_;
    }

    function releaseAsset(uint256 _id, bool isSellOrder) external onlyOwner {
        Order storage order = isSellOrder ? sellOrders[_id] : buyOrders[_id];
        if (order.isAttested == true) {
                transferFromEncrypted(address(this), order.buyer, order.amount);
            emit AssetReleased(order.seller, order.buyer, order.amount);
        } else {
            revert ReleaseUnsuccesful();
        }
    }

    function attest(uint256 _id, bool isSellOrder)
        external
        onlyOwner
        returns (uint64)
    {
        Order storage order = isSellOrder ? sellOrders[_id] : buyOrders[_id];
        if (order.isComplete == true) {
            order.isAttested = true;
            // confirm that the buyer or seller has confirm payment
            // We now make an attestation of having actually buyer actually sent the fiat to bank account and seller approve transfer crypto to buyer
            bytes[] memory recipients = new bytes[](2);
            recipients[0] = abi.encode(order.seller);
            recipients[1] = abi.encode(order.buyer);
            Attestation memory a = Attestation({
                schemaId: schemaId,
                linkedAttestationId: 0,
                attestTimestamp: 0,
                revokeTimestamp: 0,
                attester: address(this),
                validUntil: 0,
                dataLocation: DataLocation.ONCHAIN,
                revoked: false,
                recipients: recipients,
                data: ""
            });
            uint64 attestationId = spInstance.attest(a, "", "", "");
            return attestationId;
        } else {
            revert AttestationWrongAttester();
        }
    }

    function addOrder(
        euint128 _amount,
        euint256 _price,
        Fiat _fiat,
        euint256 _accountNumber,
        string memory _bank,
        bool isSellOrder
    ) internal {
        // Create the order using encrypted types
        Order memory newOrder = Order({
            id: isSellOrder ? sellOrders.length : buyOrders.length,
            amount: _amount,
            price: _price,
            isActive: false,
            isComplete: false,
            seller: isSellOrder ? msg.sender : address(0),
            buyer: isSellOrder ? address(0) : msg.sender,
            messages: new string[](0),
            fiatCurrency: _fiat,
            accountNumber: _accountNumber,
            bank: _bank,
            isAttested: false
        });

        // Use FHE-compatible transfer logic
        if (isSellOrder) {
                transferFromEncrypted(msg.sender, address(this), _amount);
            sellOrders.push(newOrder);
            sellOrder[newOrder.id] = newOrder;
        } else {
            buyOrders.push(newOrder);
            buyOrder[newOrder.id] = newOrder;
        }

        emit OrderCreated(newOrder.id, isSellOrder, msg.sender);
    }

    function addSellOrder(
        euint128 _amount,
        euint256 _price,
        Fiat _fiat,
        euint256 _accountNumber,
        string memory _bank
    ) public {
        addOrder(_amount, _price, _fiat, _accountNumber, _bank, true);
    }

    function addBuyOrder(
        euint128 _amount,
        euint256 _price,
        Fiat _fiat,
        euint256 _accountNumber,
        string memory _bank
    ) public {
        addOrder(_amount, _price, _fiat, _accountNumber, _bank, false);
    }

    function updateOrderToActive(uint256 _id, bool isSellOrder) public {
        Order storage order = isSellOrder ? sellOrders[_id] : buyOrders[_id];
        require(!order.isActive, "Order already active");
        require(
            msg.sender != (isSellOrder ? order.seller : order.buyer),
            "Cannot activate own order"
        );
        order.isActive = true;
        if (isSellOrder) {
            order.buyer = msg.sender;
        } else {
            order.seller = msg.sender;
        }
    }

    function updateSellOrderToActive(uint256 _id) public {
        updateOrderToActive(_id, true);
    }

    function updateBuyOrderToActive(uint256 _id) public {
        updateOrderToActive(_id, false);
    }

    function distributeReferralReward(address depositor, uint256 amount)
        internal
    {
        address upliner = upliners[depositor];
        if (upliner != address(0)) {
            uint256 uplinerReward = (amount * 10) / 100;
            _mint(upliner, uplinerReward);
            emit RewardDistributed(upliner, depositor, uplinerReward);
        }
    }

    function updateOrderToPaid(uint256 _id, bool isSellOrder)
        public
        nonReentrant
    {
        Order storage order = isSellOrder ? sellOrders[_id] : buyOrders[_id];
        require(order.isActive, "Order not active");
        require(
            msg.sender == (isSellOrder ? order.buyer : order.seller),
            "Unauthorized action"
        );
        transferEncrypted(order.buyer, order.amount);
        order.isComplete = true;
        _mint(msg.sender, 1);

        distributeReferralReward(msg.sender, 1);
        emit OrderCompleted(_id, isSellOrder);
    }

    function updateSellOrderToPaid(uint256 _id) public {
        updateOrderToPaid(_id, true);
    }

    function updateBuyOrderToPaid(uint256 _id) public {
        updateOrderToPaid(_id, false);
    }

    function cancelOrder(uint256 _id, bool isSellOrder) public {
        Order storage order = isSellOrder ? sellOrders[_id] : buyOrders[_id];
        require(
            msg.sender == (isSellOrder ? order.seller : order.buyer),
            "Unauthorized action"
        );
        if (isSellOrder) {
           transferEncrypted(order.seller, order.amount);
        }
        order.isComplete = true;

        emit OrderCancelled(_id, isSellOrder);
    }

    function cancelSellOrder(uint256 _id) public {
        cancelOrder(_id, true);
    }

    function cancelBuyOrder(uint256 _id) public {
        cancelOrder(_id, false);
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

    function getDownliners(address upliner)
        public
        view
        returns (address[] memory)
    {
        return downliners[upliner];
    }

    // Get all complete orders for admin to access before attestation so that crypto can be release
    function getAllCompleteBuyOrders() public view returns (Order[] memory) {
        Order[] memory orders = new Order[](buyOrders.length);
        uint256 count = 0;
        for (uint256 i = 0; i < buyOrders.length; i++) {
            if (buyOrders[i].isComplete) {
                orders[count] = buyOrders[i];
                count++;
            }
        }
        return orders;
    }

    // Get all complete orders for admin to access before attestation so that crypto can be release
    function getAllCompleteSellOrders() public view returns (Order[] memory) {
        Order[] memory orders = new Order[](sellOrders.length);
        uint256 count = 0;
        for (uint256 i = 0; i < sellOrders.length; i++) {
            if (sellOrders[i].isComplete) {
                orders[count] = sellOrders[i];
                count++;
            }
        }
        return orders;
    }

    // Get all buy orders
    function getAllBuyOrders() public view returns (Order[] memory) {
        Order[] memory orders = new Order[](buyOrders.length);
        uint256 count = 0;
        for (uint256 i = 0; i < buyOrders.length; i++) {
            if (buyOrders[i].isActive) {
                orders[count] = buyOrders[i];
                count++;
            }
        }
        return orders;
    }

    // Get all sell orders
    function getAllSellOrders() public view returns (Order[] memory) {
        Order[] memory orders = new Order[](sellOrders.length);
        uint256 count = 0;
        for (uint256 i = 0; i < sellOrders.length; i++) {
            if (sellOrders[i].isActive) {
                orders[count] = sellOrders[i];
                count++;
            }
        }
        return orders;
    }

    function getOrdersByFiat(Fiat _fiat, bool isSellOrder)
        public
        view
        returns (Order[] memory)
    {
        Order[] memory orders = isSellOrder ? sellOrders : buyOrders;
        uint256 count = 0;
        for (uint256 i = 0; i < orders.length; i++) {
            if (orders[i].fiatCurrency == _fiat && !orders[i].isComplete) {
                count++;
            }
        }

        Order[] memory result = new Order[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < orders.length; i++) {
            if (orders[i].fiatCurrency == _fiat && !orders[i].isComplete) {
                result[index] = orders[i];
                index++;
            }
        }
        return result;
    }

    function getSellOrdersByFiat(Fiat _fiat)
        public
        view
        returns (Order[] memory)
    {
        return getOrdersByFiat(_fiat, true);
    }

    function getBuyOrdersByFiat(Fiat _fiat)
        public
        view
        returns (Order[] memory)
    {
        return getOrdersByFiat(_fiat, false);
    }

    function getOpenSellOrders() public view returns (Order[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < sellOrders.length; i++) {
            if (!sellOrders[i].isComplete && !sellOrders[i].isActive) {
                count++;
            }
        }
        Order[] memory openSellOrders = new Order[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < sellOrders.length; i++) {
            if (!sellOrders[i].isComplete && !sellOrders[i].isActive) {
                openSellOrders[index] = sellOrders[i];
                index++;
            }
        }
        return openSellOrders;
    }

    function getOpenBuyOrders() public view returns (Order[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < buyOrders.length; i++) {
            if (!buyOrders[i].isComplete && !buyOrders[i].isActive) {
                count++;
            }
        }
        Order[] memory openBuyOrders = new Order[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < buyOrders.length; i++) {
            if (!buyOrders[i].isComplete && !buyOrders[i].isActive) {
                openBuyOrders[index] = buyOrders[i];
                index++;
            }
        }
        return openBuyOrders;
    }

    function myOpenSellorders() public view returns (Order[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < sellOrders.length; i++) {
            if (
                msg.sender == sellOrders[i].buyer ||
                (msg.sender == sellOrders[i].seller && sellOrders[i].isActive)
            ) {
                count++;
            }
        }
        Order[] memory openSellOrders = new Order[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < sellOrders.length; i++) {
            if (
                msg.sender == sellOrders[i].buyer ||
                (msg.sender == sellOrders[i].seller && sellOrders[i].isActive)
            ) {
                openSellOrders[index] = sellOrders[i];
            }
            index++;
        }
        return openSellOrders;
    }

    function myOpenBuyOrders() public view returns (Order[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < buyOrders.length; i++) {
            if (
                msg.sender == buyOrders[i].buyer ||
                (msg.sender == buyOrders[i].seller && buyOrders[i].isActive)
            ) {
                count++;
            }
        }
        Order[] memory openBuyOrders = new Order[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < buyOrders.length; i++) {
            if (
                msg.sender == buyOrders[i].buyer ||
                (msg.sender == buyOrders[i].seller && buyOrders[i].isActive)
            ) {
                openBuyOrders[index] = buyOrders[i];
            }
            index++;
        }
        return openBuyOrders;
    }
}
