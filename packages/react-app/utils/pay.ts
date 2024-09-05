export const contractAddress = "0x3505B26D79ABfd4Dd6dF6d4aC4DaD1bD93dEB0f4"; //"0xd5c8a20fdd0973e121bdf70dce49af1c18aad383";
export const abi = [
	{
	  "type": "function",
	  "name": "addMerchant",
	  "inputs": [
		{
		  "name": "_name",
		  "type": "string",
		  "internalType": "string"
		},
		{
		  "name": "_description",
		  "type": "string",
		  "internalType": "string"
		},
		{
		  "name": "_walletAddress",
		  "type": "address",
		  "internalType": "address"
		}
	  ],
	  "outputs": [],
	  "stateMutability": "nonpayable"
	},
	{
	  "type": "function",
	  "name": "allMerchant",
	  "inputs": [],
	  "outputs": [
		{
		  "name": "",
		  "type": "tuple[]",
		  "internalType": "struct PayBills.Merchant[]",
		  "components": [
			{
			  "name": "id",
			  "type": "uint256",
			  "internalType": "uint256"
			},
			{
			  "name": "name",
			  "type": "string",
			  "internalType": "string"
			},
			{
			  "name": "description",
			  "type": "string",
			  "internalType": "string"
			},
			{
			  "name": "walletAddress",
			  "type": "address",
			  "internalType": "address"
			}
		  ]
		}
	  ],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "getMerchantInfo",
	  "inputs": [
		{
		  "name": "userId",
		  "type": "uint256",
		  "internalType": "uint256"
		}
	  ],
	  "outputs": [
		{
		  "name": "",
		  "type": "tuple",
		  "internalType": "struct PayBills.Merchant",
		  "components": [
			{
			  "name": "id",
			  "type": "uint256",
			  "internalType": "uint256"
			},
			{
			  "name": "name",
			  "type": "string",
			  "internalType": "string"
			},
			{
			  "name": "description",
			  "type": "string",
			  "internalType": "string"
			},
			{
			  "name": "walletAddress",
			  "type": "address",
			  "internalType": "address"
			}
		  ]
		}
	  ],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "merchants",
	  "inputs": [
		{
		  "name": "",
		  "type": "uint256",
		  "internalType": "uint256"
		}
	  ],
	  "outputs": [
		{
		  "name": "id",
		  "type": "uint256",
		  "internalType": "uint256"
		},
		{
		  "name": "name",
		  "type": "string",
		  "internalType": "string"
		},
		{
		  "name": "description",
		  "type": "string",
		  "internalType": "string"
		},
		{
		  "name": "walletAddress",
		  "type": "address",
		  "internalType": "address"
		}
	  ],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "owner",
	  "inputs": [
		{
		  "name": "",
		  "type": "uint256",
		  "internalType": "uint256"
		}
	  ],
	  "outputs": [
		{
		  "name": "",
		  "type": "address",
		  "internalType": "address"
		}
	  ],
	  "stateMutability": "view"
	},
	{
	  "type": "function",
	  "name": "send",
	  "inputs": [
		{
		  "name": "to",
		  "type": "address",
		  "internalType": "address"
		},
		{
		  "name": "amount",
		  "type": "uint256",
		  "internalType": "uint256"
		}
	  ],
	  "outputs": [],
	  "stateMutability": "nonpayable"
	},
	{
	  "type": "function",
	  "name": "updateMerchant",
	  "inputs": [
		{
		  "name": "userId",
		  "type": "uint256",
		  "internalType": "uint256"
		},
		{
		  "name": "_name",
		  "type": "string",
		  "internalType": "string"
		},
		{
		  "name": "_description",
		  "type": "string",
		  "internalType": "string"
		},
		{
		  "name": "_walletAddress",
		  "type": "address",
		  "internalType": "address"
		}
	  ],
	  "outputs": [],
	  "stateMutability": "nonpayable"
	},
	{
	  "type": "event",
	  "name": "MerchantAdded",
	  "inputs": [
		{
		  "name": "merchantId",
		  "type": "uint256",
		  "indexed": true,
		  "internalType": "uint256"
		},
		{
		  "name": "name",
		  "type": "string",
		  "indexed": false,
		  "internalType": "string"
		},
		{
		  "name": "description",
		  "type": "string",
		  "indexed": false,
		  "internalType": "string"
		},
		{
		  "name": "walletAddress",
		  "type": "address",
		  "indexed": false,
		  "internalType": "address"
		}
	  ],
	  "anonymous": false
	},
	{
	  "type": "event",
	  "name": "MerchantUpdated",
	  "inputs": [
		{
		  "name": "merchantId",
		  "type": "uint256",
		  "indexed": true,
		  "internalType": "uint256"
		},
		{
		  "name": "name",
		  "type": "string",
		  "indexed": false,
		  "internalType": "string"
		},
		{
		  "name": "description",
		  "type": "string",
		  "indexed": false,
		  "internalType": "string"
		},
		{
		  "name": "walletAddress",
		  "type": "address",
		  "indexed": false,
		  "internalType": "address"
		}
	  ],
	  "anonymous": false
	},
	{
	  "type": "event",
	  "name": "Sent",
	  "inputs": [
		{
		  "name": "from",
		  "type": "address",
		  "indexed": true,
		  "internalType": "address"
		},
		{
		  "name": "to",
		  "type": "address",
		  "indexed": true,
		  "internalType": "address"
		},
		{
		  "name": "amount",
		  "type": "uint256",
		  "indexed": false,
		  "internalType": "uint256"
		}
	  ],
	  "anonymous": false
	}
  ]