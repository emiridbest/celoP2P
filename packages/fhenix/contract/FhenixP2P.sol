// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@fhenixprotocol/contracts/FHE.sol";

import { FHERC20 } from "@fhenixprotocol/contracts/experimental/token/FHERC20/FHERC20.sol";
import { FHE, euint32, inEuint32 } from "@fhenixprotocol/contracts/FHE.sol";

contract P2pFhenix {
    enum Fiat {
        NGN, // Nigerian Naira
        KSH, // Kenyan Shilling
        UGX, // Ugandan Shilling
        GHS  // Ghanaian Cedi
    }

    struct Order {
        euint id;                // Encrypted ID
        euint amount;            // Encrypted amount
        euint price;             // Encrypted price
        euint accountNumber;     // Encrypted account number
        ebytes bank;             // Encrypted bank name
        ebytes[] messages;       // Encrypted messages
        ebool isActive;          // Encrypted boolean for active status
        ebool isComplete;        // Encrypted boolean for completion status
        eaddress seller;         // Encrypted seller address
        eaddress buyer;          // Encrypted buyer address
        Fiat fiatCurrency;       // Fiat currency remains plain since it's not sensitive
    }

    Order[] public sellOrders;
    Order[] public buyOrders;
    eaddress public owner;

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    modifier onlySeller(euint _id, ebool isSellOrder) {
        require(
            msg.sender == (isSellOrder ? sellOrders[_id].seller : buyOrders[_id].seller),
            "Unauthorized action"
        );
        _;
    }

    modifier onlyBuyer(euint _id, ebool isSellOrder) {
        require(
            msg.sender == (isSellOrder ? sellOrders[_id].buyer : buyOrders[_id].buyer),
            "Unauthorized action"
        );
        _;
    }

    constructor(eaddress _owner) {
        owner = _owner;
    }

    // Add a new sell order with encrypted data
    function addSellOrder(
        euint _amount,
        euint _price,
        Fiat _fiat,
        euint _accountNumber,
        ebytes memory _bank
    ) public {
        sellOrders.push(
            Order({
                id: euint(sellOrders.length),
                amount: _amount,
                price: _price,
                isActive: ebool(false),
                isComplete: ebool(false),
                seller: eaddress(msg.sender),
                buyer: eaddress(0),
                messages: new ebytes ,
                fiatCurrency: _fiat,
                accountNumber: _accountNumber,
                bank: _bank
            })
        );
    }

    // Add a new buy order with encrypted data
    function addBuyOrder(
        euint _amount,
        euint _price,
        Fiat _fiat,
        euint _accountNumber,
        ebytes memory _bank
    ) public {
        buyOrders.push(
            Order({
                id: euint(buyOrders.length),
                amount: _amount,
                price: _price,
                isActive: ebool(false),
                isComplete: ebool(false),
                seller: eaddress(0),
                buyer: eaddress(msg.sender),
                messages: new ebytes ,
                fiatCurrency: _fiat,
                accountNumber: _accountNumber,
                bank: _bank
            })
        );
    }

    // Activate a sell order
    function updateSellOrderToActive(euint _id) public {
        require(!sellOrders[_id].isActive, "Sell order already active");
        require(
            msg.sender != sellOrders[_id].seller,
            "Seller cannot be the buyer"
        );
        sellOrders[_id].isActive = ebool(true);
        sellOrders[_id].buyer = eaddress(msg.sender);
    }

    // Activate a buy order
    function updateBuyOrderToActive(euint _id) public {
        require(!buyOrders[_id].isActive, "Buy order already active");
        require(
            msg.sender != buyOrders[_id].buyer,
            "Buyer cannot be the seller"
        );
        buyOrders[_id].isActive = ebool(true);
        buyOrders[_id].seller = eaddress(msg.sender);
    }

    // Mark a sell order as paid and complete the transaction
    function updateSellOrderToPaid(euint _id) public onlyBuyer(_id, ebool(true)) {
        require(sellOrders[_id].isActive, "Sell order is not active");
        // Implement homomorphic transaction logic for Fhenix
        sellOrders[_id].isComplete = ebool(true);
    }

    // Mark a buy order as paid and complete the transaction
    function updateBuyOrderToPaid(euint _id) public onlySeller(_id, ebool(false)) {
        require(buyOrders[_id].isActive, "Buy order not active");
        // Implement homomorphic transaction logic for Fhenix
        buyOrders[_id].isComplete = ebool(true);
    }

    // Cancel a sell order
    function cancelSellOrder(euint _id) public onlySeller(_id, ebool(true)) {
        sellOrders[_id].isComplete = ebool(true);
    }

    // Cancel a buy order
    function cancelBuyOrder(euint _id) public onlyBuyer(_id, ebool(false)) {
        buyOrders[_id].isComplete = ebool(true);
    }

    // Get orders by fiat currency (returns encrypted data)
    function getOrdersByFiat(Fiat _fiat, ebool isSellOrder)
        public
        view
        returns (Order[] memory)
    {
        Order[] memory orders = isSellOrder ? sellOrders : buyOrders;
        uint256 count = 0;
        for (euint i = 0; i < orders.length; i++) {
            if (orders[i].fiatCurrency == _fiat && !orders[i].isComplete) {
                count++;
            }
        }
        Order[] memory filteredOrders = new Order[](count);
        uint256 index = 0;
        for (euint i = 0; i < orders.length; i++) {
            if (orders[i].fiatCurrency == _fiat && !orders[i].isComplete) {
                filteredOrders[index] = orders[i];
                index++;
            }
        }
        return filteredOrders;
    }
}
