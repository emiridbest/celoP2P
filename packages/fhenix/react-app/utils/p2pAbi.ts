export const contractAddress = "0x5df0e4556ecc6e0b86c969bcbe51e352a728531b";
export const abi = [
	{
		"inputs": [],
		"name": "AttestationWrongAttester",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "ECDSAInvalidSignature",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "length",
				"type": "uint256"
			}
		],
		"name": "ECDSAInvalidSignatureLength",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "s",
				"type": "bytes32"
			}
		],
		"name": "ECDSAInvalidSignatureS",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "allowance",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "needed",
				"type": "uint256"
			}
		],
		"name": "ERC20InsufficientAllowance",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "balance",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "needed",
				"type": "uint256"
			}
		],
		"name": "ERC20InsufficientBalance",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "approver",
				"type": "address"
			}
		],
		"name": "ERC20InvalidApprover",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			}
		],
		"name": "ERC20InvalidReceiver",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			}
		],
		"name": "ERC20InvalidSender",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "ERC20InvalidSpender",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "ErrorInsufficientFunds",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "InvalidShortString",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "OwnableInvalidOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "OwnableUnauthorizedAccount",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "ReentrancyGuardReentrantCall",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "ReleaseUnsuccesful",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "SignerNotMessageSender",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "SignerNotOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "str",
				"type": "string"
			}
		],
		"name": "StringTooLong",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "ApprovalEncrypted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "seller",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "buyer",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "euint128",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "AssetReleased",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [],
		"name": "EIP712DomainChanged",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "isSellOrder",
				"type": "bool"
			}
		],
		"name": "OrderCancelled",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "isSellOrder",
				"type": "bool"
			}
		],
		"name": "OrderCompleted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "isSellOrder",
				"type": "bool"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "creator",
				"type": "address"
			}
		],
		"name": "OrderCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			}
		],
		"name": "TransferEncrypted",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "euint128",
				"name": "_amount",
				"type": "uint256"
			},
			{
				"internalType": "euint256",
				"name": "_price",
				"type": "uint256"
			},
			{
				"internalType": "enum AttestedCeloP2P.Fiat",
				"name": "_fiat",
				"type": "uint8"
			},
			{
				"internalType": "euint256",
				"name": "_accountNumber",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_bank",
				"type": "string"
			}
		],
		"name": "addBuyOrder",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "euint128",
				"name": "_amount",
				"type": "uint256"
			},
			{
				"internalType": "euint256",
				"name": "_price",
				"type": "uint256"
			},
			{
				"internalType": "enum AttestedCeloP2P.Fiat",
				"name": "_fiat",
				"type": "uint8"
			},
			{
				"internalType": "euint256",
				"name": "_accountNumber",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_bank",
				"type": "string"
			}
		],
		"name": "addSellOrder",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"components": [
					{
						"internalType": "bytes",
						"name": "data",
						"type": "bytes"
					}
				],
				"internalType": "struct inEuint128",
				"name": "value",
				"type": "tuple"
			}
		],
		"name": "approveEncrypted",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isSellOrder",
				"type": "bool"
			}
		],
		"name": "releaseAsset",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"components": [
					{
						"internalType": "bytes",
						"name": "data",
						"type": "bytes"
					}
				],
				"internalType": "struct inEuint128",
				"name": "encryptedAmount",
				"type": "tuple"
			}
		],
		"name": "transferEncrypted",
		"outputs": [
			{
				"internalType": "euint128",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "euint128",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferEncrypted",
		"outputs": [
			{
				"internalType": "euint128",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"components": [
					{
						"internalType": "bytes",
						"name": "data",
						"type": "bytes"
					}
				],
				"internalType": "struct inEuint128",
				"name": "value",
				"type": "tuple"
			}
		],
		"name": "transferFromEncrypted",
		"outputs": [
			{
				"internalType": "euint128",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "euint128",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "transferFromEncrypted",
		"outputs": [
			{
				"internalType": "euint128",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint32",
				"name": "amount",
				"type": "uint32"
			}
		],
		"name": "unwrap",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "updateBuyOrderToActive",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "updateBuyOrderToPaid",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isSellOrder",
				"type": "bool"
			}
		],
		"name": "updateOrderToActive",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isSellOrder",
				"type": "bool"
			}
		],
		"name": "updateOrderToPaid",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "updateSellOrderToActive",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "updateSellOrderToPaid",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint32",
				"name": "amount",
				"type": "uint32"
			}
		],
		"name": "wrap",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "_allowanceEncrypted",
		"outputs": [
			{
				"internalType": "euint128",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"components": [
					{
						"internalType": "bytes32",
						"name": "publicKey",
						"type": "bytes32"
					},
					{
						"internalType": "bytes",
						"name": "signature",
						"type": "bytes"
					}
				],
				"internalType": "struct Permission",
				"name": "permission",
				"type": "tuple"
			}
		],
		"name": "allowanceEncrypted",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"components": [
					{
						"internalType": "bytes32",
						"name": "publicKey",
						"type": "bytes32"
					},
					{
						"internalType": "bytes",
						"name": "signature",
						"type": "bytes"
					}
				],
				"internalType": "struct Permission",
				"name": "auth",
				"type": "tuple"
			}
		],
		"name": "balanceOfEncrypted",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "buyOrder",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "euint128",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "euint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"internalType": "euint256",
				"name": "accountNumber",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "bank",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "isActive",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "isComplete",
				"type": "bool"
			},
			{
				"internalType": "address",
				"name": "seller",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "buyer",
				"type": "address"
			},
			{
				"internalType": "enum AttestedCeloP2P.Fiat",
				"name": "fiatCurrency",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "buyOrders",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "euint128",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "euint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"internalType": "euint256",
				"name": "accountNumber",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "bank",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "isActive",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "isComplete",
				"type": "bool"
			},
			{
				"internalType": "address",
				"name": "seller",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "buyer",
				"type": "address"
			},
			{
				"internalType": "enum AttestedCeloP2P.Fiat",
				"name": "fiatCurrency",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "downliners",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "eip712Domain",
		"outputs": [
			{
				"internalType": "bytes1",
				"name": "fields",
				"type": "bytes1"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "version",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "chainId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "verifyingContract",
				"type": "address"
			},
			{
				"internalType": "bytes32",
				"name": "salt",
				"type": "bytes32"
			},
			{
				"internalType": "uint256[]",
				"name": "extensions",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllBuyOrders",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "euint128",
						"name": "amount",
						"type": "uint256"
					},
					{
						"internalType": "euint256",
						"name": "price",
						"type": "uint256"
					},
					{
						"internalType": "euint256",
						"name": "accountNumber",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "bank",
						"type": "string"
					},
					{
						"internalType": "string[]",
						"name": "messages",
						"type": "string[]"
					},
					{
						"internalType": "bool",
						"name": "isActive",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "isComplete",
						"type": "bool"
					},
					{
						"internalType": "address",
						"name": "seller",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "buyer",
						"type": "address"
					},
					{
						"internalType": "enum AttestedCeloP2P.Fiat",
						"name": "fiatCurrency",
						"type": "uint8"
					}
				],
				"internalType": "struct AttestedCeloP2P.Order[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllCompleteBuyOrders",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "euint128",
						"name": "amount",
						"type": "uint256"
					},
					{
						"internalType": "euint256",
						"name": "price",
						"type": "uint256"
					},
					{
						"internalType": "euint256",
						"name": "accountNumber",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "bank",
						"type": "string"
					},
					{
						"internalType": "string[]",
						"name": "messages",
						"type": "string[]"
					},
					{
						"internalType": "bool",
						"name": "isActive",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "isComplete",
						"type": "bool"
					},
					{
						"internalType": "address",
						"name": "seller",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "buyer",
						"type": "address"
					},
					{
						"internalType": "enum AttestedCeloP2P.Fiat",
						"name": "fiatCurrency",
						"type": "uint8"
					}
				],
				"internalType": "struct AttestedCeloP2P.Order[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllCompleteSellOrders",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "euint128",
						"name": "amount",
						"type": "uint256"
					},
					{
						"internalType": "euint256",
						"name": "price",
						"type": "uint256"
					},
					{
						"internalType": "euint256",
						"name": "accountNumber",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "bank",
						"type": "string"
					},
					{
						"internalType": "string[]",
						"name": "messages",
						"type": "string[]"
					},
					{
						"internalType": "bool",
						"name": "isActive",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "isComplete",
						"type": "bool"
					},
					{
						"internalType": "address",
						"name": "seller",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "buyer",
						"type": "address"
					},
					{
						"internalType": "enum AttestedCeloP2P.Fiat",
						"name": "fiatCurrency",
						"type": "uint8"
					}
				],
				"internalType": "struct AttestedCeloP2P.Order[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllSellOrders",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "euint128",
						"name": "amount",
						"type": "uint256"
					},
					{
						"internalType": "euint256",
						"name": "price",
						"type": "uint256"
					},
					{
						"internalType": "euint256",
						"name": "accountNumber",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "bank",
						"type": "string"
					},
					{
						"internalType": "string[]",
						"name": "messages",
						"type": "string[]"
					},
					{
						"internalType": "bool",
						"name": "isActive",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "isComplete",
						"type": "bool"
					},
					{
						"internalType": "address",
						"name": "seller",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "buyer",
						"type": "address"
					},
					{
						"internalType": "enum AttestedCeloP2P.Fiat",
						"name": "fiatCurrency",
						"type": "uint8"
					}
				],
				"internalType": "struct AttestedCeloP2P.Order[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "enum AttestedCeloP2P.Fiat",
				"name": "_fiat",
				"type": "uint8"
			}
		],
		"name": "getBuyOrdersByFiat",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "euint128",
						"name": "amount",
						"type": "uint256"
					},
					{
						"internalType": "euint256",
						"name": "price",
						"type": "uint256"
					},
					{
						"internalType": "euint256",
						"name": "accountNumber",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "bank",
						"type": "string"
					},
					{
						"internalType": "string[]",
						"name": "messages",
						"type": "string[]"
					},
					{
						"internalType": "bool",
						"name": "isActive",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "isComplete",
						"type": "bool"
					},
					{
						"internalType": "address",
						"name": "seller",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "buyer",
						"type": "address"
					},
					{
						"internalType": "enum AttestedCeloP2P.Fiat",
						"name": "fiatCurrency",
						"type": "uint8"
					}
				],
				"internalType": "struct AttestedCeloP2P.Order[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getOpenBuyOrders",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "euint128",
						"name": "amount",
						"type": "uint256"
					},
					{
						"internalType": "euint256",
						"name": "price",
						"type": "uint256"
					},
					{
						"internalType": "euint256",
						"name": "accountNumber",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "bank",
						"type": "string"
					},
					{
						"internalType": "string[]",
						"name": "messages",
						"type": "string[]"
					},
					{
						"internalType": "bool",
						"name": "isActive",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "isComplete",
						"type": "bool"
					},
					{
						"internalType": "address",
						"name": "seller",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "buyer",
						"type": "address"
					},
					{
						"internalType": "enum AttestedCeloP2P.Fiat",
						"name": "fiatCurrency",
						"type": "uint8"
					}
				],
				"internalType": "struct AttestedCeloP2P.Order[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getOpenSellOrders",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "euint128",
						"name": "amount",
						"type": "uint256"
					},
					{
						"internalType": "euint256",
						"name": "price",
						"type": "uint256"
					},
					{
						"internalType": "euint256",
						"name": "accountNumber",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "bank",
						"type": "string"
					},
					{
						"internalType": "string[]",
						"name": "messages",
						"type": "string[]"
					},
					{
						"internalType": "bool",
						"name": "isActive",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "isComplete",
						"type": "bool"
					},
					{
						"internalType": "address",
						"name": "seller",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "buyer",
						"type": "address"
					},
					{
						"internalType": "enum AttestedCeloP2P.Fiat",
						"name": "fiatCurrency",
						"type": "uint8"
					}
				],
				"internalType": "struct AttestedCeloP2P.Order[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "enum AttestedCeloP2P.Fiat",
				"name": "_fiat",
				"type": "uint8"
			},
			{
				"internalType": "bool",
				"name": "isSellOrder",
				"type": "bool"
			}
		],
		"name": "getOrdersByFiat",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "euint128",
						"name": "amount",
						"type": "uint256"
					},
					{
						"internalType": "euint256",
						"name": "price",
						"type": "uint256"
					},
					{
						"internalType": "euint256",
						"name": "accountNumber",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "bank",
						"type": "string"
					},
					{
						"internalType": "string[]",
						"name": "messages",
						"type": "string[]"
					},
					{
						"internalType": "bool",
						"name": "isActive",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "isComplete",
						"type": "bool"
					},
					{
						"internalType": "address",
						"name": "seller",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "buyer",
						"type": "address"
					},
					{
						"internalType": "enum AttestedCeloP2P.Fiat",
						"name": "fiatCurrency",
						"type": "uint8"
					}
				],
				"internalType": "struct AttestedCeloP2P.Order[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "enum AttestedCeloP2P.Fiat",
				"name": "_fiat",
				"type": "uint8"
			}
		],
		"name": "getSellOrdersByFiat",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "euint128",
						"name": "amount",
						"type": "uint256"
					},
					{
						"internalType": "euint256",
						"name": "price",
						"type": "uint256"
					},
					{
						"internalType": "euint256",
						"name": "accountNumber",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "bank",
						"type": "string"
					},
					{
						"internalType": "string[]",
						"name": "messages",
						"type": "string[]"
					},
					{
						"internalType": "bool",
						"name": "isActive",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "isComplete",
						"type": "bool"
					},
					{
						"internalType": "address",
						"name": "seller",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "buyer",
						"type": "address"
					},
					{
						"internalType": "enum AttestedCeloP2P.Fiat",
						"name": "fiatCurrency",
						"type": "uint8"
					}
				],
				"internalType": "struct AttestedCeloP2P.Order[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "myOpenBuyOrders",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "euint128",
						"name": "amount",
						"type": "uint256"
					},
					{
						"internalType": "euint256",
						"name": "price",
						"type": "uint256"
					},
					{
						"internalType": "euint256",
						"name": "accountNumber",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "bank",
						"type": "string"
					},
					{
						"internalType": "string[]",
						"name": "messages",
						"type": "string[]"
					},
					{
						"internalType": "bool",
						"name": "isActive",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "isComplete",
						"type": "bool"
					},
					{
						"internalType": "address",
						"name": "seller",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "buyer",
						"type": "address"
					},
					{
						"internalType": "enum AttestedCeloP2P.Fiat",
						"name": "fiatCurrency",
						"type": "uint8"
					}
				],
				"internalType": "struct AttestedCeloP2P.Order[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "myOpenSellorders",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "euint128",
						"name": "amount",
						"type": "uint256"
					},
					{
						"internalType": "euint256",
						"name": "price",
						"type": "uint256"
					},
					{
						"internalType": "euint256",
						"name": "accountNumber",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "bank",
						"type": "string"
					},
					{
						"internalType": "string[]",
						"name": "messages",
						"type": "string[]"
					},
					{
						"internalType": "bool",
						"name": "isActive",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "isComplete",
						"type": "bool"
					},
					{
						"internalType": "address",
						"name": "seller",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "buyer",
						"type": "address"
					},
					{
						"internalType": "enum AttestedCeloP2P.Fiat",
						"name": "fiatCurrency",
						"type": "uint8"
					}
				],
				"internalType": "struct AttestedCeloP2P.Order[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "sellOrder",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "euint128",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "euint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"internalType": "euint256",
				"name": "accountNumber",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "bank",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "isActive",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "isComplete",
				"type": "bool"
			},
			{
				"internalType": "address",
				"name": "seller",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "buyer",
				"type": "address"
			},
			{
				"internalType": "enum AttestedCeloP2P.Fiat",
				"name": "fiatCurrency",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "sellOrders",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "euint128",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "euint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"internalType": "euint256",
				"name": "accountNumber",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "bank",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "isActive",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "isComplete",
				"type": "bool"
			},
			{
				"internalType": "address",
				"name": "seller",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "buyer",
				"type": "address"
			},
			{
				"internalType": "enum AttestedCeloP2P.Fiat",
				"name": "fiatCurrency",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "tokenIncentive",
		"outputs": [
			{
				"internalType": "euint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "upliners",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]