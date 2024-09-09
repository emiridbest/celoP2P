import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { BrowserProvider, Contract } from 'ethers';
import { EncryptionTypes, FhenixClient } from 'fhenixjs';
import { JsonRpcProvider } from 'ethers';
import { contractAddress, abi } from '@/utils/p2pAbi';
import { Order } from './index';
import { ArrowLeftCircleIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { UserIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';

enum FiatCurrency {
    NGN = 0, // Nigerian Naira
    KSH = 1, // Kenyan Shilling
    UGX = 2, // Ugandan Shilling
    GHS = 3  // Ghanaian Cedi
}

interface OrderDetailsProps {
    order: Order;
    isSellOrder: boolean;
}
const getStatusText = (status: any) => {
    return status ? <CheckIcon className='h-4 text-green-500' /> : <XMarkIcon className='h-4 text-red-600' />;
};

const getPaymentStatusText = (paid: any) => {
    return paid ? <CheckIcon className='h-4 text-green-500' /> : <XMarkIcon className='h-4 text-red-600' />;
};
const OrderDetailsPage: React.FC = () => {
    const router = useRouter();
    const { id, isSellOrder } = router.query;
    const [order, setOrder] = useState<Order | null>(null);

    const fetchOrderDetails = useCallback(async () => {
        if (id && typeof id === 'string') {
            if (window.ethereum) {
                try {

                    const provider = new BrowserProvider(window.ethereum);
                    const client = new FhenixClient({ provider });
                    //  let encrypted = await client.encrypt(5, EncryptionTypes.uint8);
                    const signer = await provider.getSigner();
                    const contract = new Contract(contractAddress, abi, signer);
                    const address = await signer.getAddress();

                    const details = isSellOrder === 'true'
                        ? await contract.sellOrders(id)
                        : await contract.buyOrders(id);

                    setOrder({ id: id, ...details });
                } catch (error) {
                    console.error('Error fetching order details:', error);
                }
            }
        }
    }, [id, isSellOrder]);

    useEffect(() => {
        fetchOrderDetails();
    }, [fetchOrderDetails]);

    if (!order) {
        return <div>Loading...</div>;
    }

    return (
        <OrderDetails order={order} isSellOrder={isSellOrder === 'true'} />
    );
};

export default OrderDetailsPage;

const OrderDetails: React.FC<OrderDetailsProps> = ({ order, isSellOrder }) => {
    const router = useRouter();
    const [messages, setMessages] = useState<string[]>([]);
    const [newMessage, setNewMessage] = useState<string>("");
    const [isAttested, setIsAttested] = useState(false);
    const [isApproved, setIsApproved] = useState(false);
    const [buttonText, setButtonText] = useState('Approve');

    const attest = async (id: number) => {
        if (window.ethereum) {
            try {
                const provider = new BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const contract = new Contract(contractAddress, abi, signer);
                const gasLimit = parseInt("6000000");
                const tx = isSellOrder
                    ? await contract.attest(id, 1, { gasLimit })
                    : await contract.attest(id, 0, { gasLimit });
                console.log(id);
                await tx.wait();
                setIsAttested(true);
            } catch (error) {
                console.error("Error making attestation:", error);
            }
        }
    };
    const releaseAsset = async (id: number) => {
        if (window.ethereum) {
            try {
                const provider = new BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const contract = new Contract(contractAddress, abi, signer);
                const gasLimit = parseInt("6000000");
                const tx = isSellOrder
                    ? await contract.releaseAsset(id, 1, { gasLimit })
                    : await contract.releaseAsset(id, 0, { gasLimit });
                console.log(id);
                await tx.wait();
                //  router.push('/admin');
            } catch (error) {
                console.error("Error making transfer:", error);
            }
        }
    };

    const handleReturnHome = () => {
        router.push('/admin');
    };

    const handleSendMessage = () => {
        if (newMessage.trim() !== "") {
            setMessages([...messages, newMessage]);
            setNewMessage("");
        }
    };
    const provider = new BrowserProvider(window.ethereum);
    const client = new FhenixClient({ provider });
    const fiat = FiatCurrency[order[9]];
    const units = client.unseal(contractAddress, order[1]);
    const price = client.unseal(contractAddress, order[2]);
    const account = client.unseal(contractAddress, order[3]);
    const buyer = order[8].toString();
    const seller = order[7].toString();
    const total = (units * price).toString();


    return (
        <div className="p-3">
            <div className="flex items-center gap-2">
                <ArrowLeftCircleIcon
                    onClick={handleReturnHome}
                    className="h-6 cursor-pointer"
                />

            </div>
            <div className="flex flex-col items-center text-lg font-bold">
                {isSellOrder ? 'Sell Order' : 'Buy Order'} #{order[0].toString()}
            </div>
            <div className="flex flex-col md:flex-row mt-6 gap-6">
                <div className="flex-1 bg-black p-4 rounded-lg shadow-md text-sm text-white">
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-between">
                            <span>Units:</span>
                            <span>{units.toString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Price:</span>
                            <span>{price.toString()}</span>
                        </div>
                        {isSellOrder && <div className="flex justify-between">
                            <span>Account Number:</span>
                            <span>{account.toString()}</span>
                        </div>}
                        {isSellOrder && <div className="flex justify-between">
                            <span>Bank:</span>
                            <span>{order[4]}</span>
                        </div>}
                        <div className="flex justify-between">
                            <span>Status:</span>
                            <span>{getStatusText(order[5])}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Paid:</span>
                            <span>{getPaymentStatusText(order[6])}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Seller:</span>
                            <span>{order[7]}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Buyer:</span>
                            <span>{order[8]}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Fiat:</span>
                            <span>{FiatCurrency[order[9]]}</span>
                        </div>
                    </div>
                </div>

                <div className="flex-1 bg-black p-4 rounded-lg shadow-md text-white">
                    <div className="text-lg font-bold mb-4">Messages</div>
                    <div className="flex flex-col gap-2 max-h-96 overflow-y-auto">
                        {messages.map((msg, index) => (
                            <div key={index} className="flex items-start gap-2">
                                <UserIcon className="h-5 w-5 text-gray-400" />
                                <div className="bg-black p-2 rounded-lg">
                                    {msg}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 flex gap-2">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            className="flex-1 p-2 rounded-lg bg-black text-white"
                            placeholder="Type your message..."
                        />
                        <button
                            onClick={handleSendMessage}
                            className="px-4 py-2 bg-prosperity rounded-lg text-black"
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-6 text-sm bg-black p-4 rounded-lg text-gray-600">
                By clicking the Attest button, I affirmed I am sure {buyer} has transferred  {total}{fiat} to {seller}
            </div>

            <div className="mt-6 flex gap-4 text-sm">
                <button
                    disabled={isAttested}
                    onClick={() => attest(order.id)}
                    className={`${!isAttested
                        ? "text-prosperity bg-black hover:bg-black hover:text-white"
                        : "bg-black/10 cursor-not-allowed text-white"
                        } inline-flex w-full text-black items-center justify-center rounded-md p-2 mb-2 `}                >
                    Attest
                </button>
            </div>
            <div className="mt-6 flex gap-4 text-sm">
                <button
                    disabled={!isAttested}
                    onClick={() => releaseAsset(order.id)}
                    className={`${isAttested
                        ? "text-prosperity bg-black hover:bg-black hover:text-white"
                        : "bg-black/10 cursor-not-allowed text-white"
                        } inline-flex w-full text-black items-center justify-center rounded-md p-2 mb-2 `}                >
                    Release
                </button>
            </div>
        </div>
    );
};
