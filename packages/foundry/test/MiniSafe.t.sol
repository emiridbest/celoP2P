// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Test, console} from "forge-std/Test.sol";
import "../src/MiniSafe.sol";

contract MiniSafeTest is Test {
    MiniSafe miniSafe;
    address user1;
    address user2;

    function setUp() public {
        miniSafe = new MiniSafe();
        user1 = address(1);
        user2 = address(2);
    }

    function testDepositCELO() public {
        uint256 depositAmount = 1 ether;
        vm.deal(user1, depositAmount);
        vm.prank(user1);
        miniSafe.deposit(address(0), depositAmount);

        uint256 celoBalance;
        uint256 cUsdBalance;
        uint256 depositTime;
        uint256 tokenIncentive;

        // Retrieve values from miniSafe.balances(user1)
        (celoBalance, cUsdBalance, depositTime, tokenIncentive) = miniSafe
            .balances(user1);

        // Create a TokenBalance struct with the retrieved values
        MiniSafe.TokenBalance memory balance = MiniSafe.TokenBalance({
            celoBalance: celoBalance,
            cUsdBalance: cUsdBalance,
            depositTime: depositTime,
            tokenIncentive: tokenIncentive
        });
        console.log(tokenIncentive, celoBalance);
        assertEq(balance.celoBalance, celoBalance);
    }

   function testRewardDistribution() public {
        uint256 depositAmount = 1 ether;
        vm.deal(user1, depositAmount);
        vm.prank(user1);
        miniSafe.setUpliner(user2);
               miniSafe.deposit(address(0), depositAmount);

        uint256 celoBalance;
        uint256 cUsdBalance;
        uint256 depositTime;
        uint256 tokenIncentive;

        // Retrieve values from miniSafe.balances(user1)
        (celoBalance, cUsdBalance, depositTime, tokenIncentive) = miniSafe
            .balances(user2);

        // Create a TokenBalance struct with the retrieved values
        MiniSafe.TokenBalance memory balance = MiniSafe.TokenBalance({
            celoBalance: celoBalance,
            cUsdBalance: cUsdBalance,
            depositTime: depositTime,
            tokenIncentive: tokenIncentive
        });
        console.log(tokenIncentive, celoBalance);
        assertEq(balance.tokenIncentive, tokenIncentive);
    }

    function testDepositCUSD() public {
        uint256 depositAmount = 1000 * 1e18;
        IERC20 cUsdToken = IERC20(0x765DE816845861e75A25fCA122bb6898B8B1282a);

        vm.prank(user1);
        cUsdToken.approve(address(miniSafe), depositAmount);

        // Setting up cUSD balances and approvals
        address cusdToken = miniSafe.CUSD_TOKEN_ADDRESS();
        IERC20(cusdToken).approve(address(miniSafe), type(uint256).max);
        IERC20(cusdToken).transfer(address(1), 1000 ether);
        vm.prank(user1);
        IERC20(cusdToken).approve(address(miniSafe), type(uint256).max);
        miniSafe.deposit(address(cUsdToken), depositAmount);

        uint256 celoBalance;
        uint256 cUsdBalance;
        uint256 depositTime;
        uint256 tokenIncentive;

        // Retrieve values from miniSafe.balances(user1)
        (celoBalance, cUsdBalance, depositTime, tokenIncentive) = miniSafe
            .balances(user1);

        // Create a TokenBalance struct with the retrieved values
        MiniSafe.TokenBalance memory balance = MiniSafe.TokenBalance({
            celoBalance: celoBalance,
            cUsdBalance: cUsdBalance,
            depositTime: depositTime,
            tokenIncentive: tokenIncentive
        });
        assertEq(balance.cUsdBalance, depositAmount);
    }

    function testBreakTimelockCELO() public {
        uint256 depositAmount = 1 ether;
        vm.deal(user1, depositAmount);
        vm.prank(user1);
        miniSafe.deposit(address(0), depositAmount);

        vm.warp(block.timestamp + 1 weeks);
        vm.prank(user1);
        miniSafe.withdraw(address(0));

        uint256 celoBalance;
        uint256 cUsdBalance;
        uint256 depositTime;
        uint256 tokenIncentive;

        // Retrieve values from miniSafe.balances(user1)
        (celoBalance, cUsdBalance, depositTime, tokenIncentive) = miniSafe
            .balances(user1);

        // Create a TokenBalance struct with the retrieved values
        MiniSafe.TokenBalance memory balance = MiniSafe.TokenBalance({
            celoBalance: celoBalance,
            cUsdBalance: cUsdBalance,
            depositTime: depositTime,
            tokenIncentive: tokenIncentive
        });
        assertEq(balance.celoBalance, 0);
    }

    function testBreakTimelockCUSD() public {
        uint256 depositAmount = 1000 * 1e18;
        IERC20 cUsdToken = IERC20(0x765DE816845861e75A25fCA122bb6898B8B1282a);

        vm.prank(user1);
        cUsdToken.approve(address(miniSafe), depositAmount);
        vm.prank(user1);

        // Setting up cUSD balances and approvals
        address cusdToken = miniSafe.CUSD_TOKEN_ADDRESS();
        IERC20(cusdToken).approve(address(miniSafe), type(uint256).max);
        IERC20(cusdToken).transfer(address(1), 1000 ether);
        vm.prank(address(1));
        IERC20(cusdToken).approve(address(miniSafe), type(uint256).max);
        miniSafe.deposit(address(cUsdToken), depositAmount);

        vm.warp(block.timestamp + 1 weeks);
        vm.prank(user1);
        miniSafe.withdraw(address(cUsdToken));

        uint256 celoBalance;
        uint256 cUsdBalance;
        uint256 depositTime;
        uint256 tokenIncentive;

        // Retrieve values from miniSafe.balances(user1)
        (celoBalance, cUsdBalance, depositTime, tokenIncentive) = miniSafe
            .balances(user1);

        // Create a TokenBalance struct with the retrieved values
        MiniSafe.TokenBalance memory balance = MiniSafe.TokenBalance({
            celoBalance: celoBalance,
            cUsdBalance: cUsdBalance,
            depositTime: depositTime,
            tokenIncentive: tokenIncentive
        });
        assertEq(balance.cUsdBalance, 0);
    }
}
