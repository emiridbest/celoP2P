/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback, useEffect } from 'react';
import { contractAddress, abi } from '@/utils/p2pAbi';
import { BrowserProvider, Contract, ZeroAddress, ethers } from 'ethers';
import OrderCard from './orderCard';
import { useRouter } from 'next/router';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { FhenixClient } from 'fhenixjs';
import { JsonRpcProvider } from 'ethers';
import MyOrders from './myOrders';


export interface Order {
    [x: string]: any;
    id: number;
    amount: number;
    price: number;
    accountNumber: number;
    bank: string;
    messages: string[];
    seller: string;
    buyer: string;
    fiatCurrency: [0, 1, 2, 3];
}

const Main: React.FC = () => {
    const [sellOrders, setSellOrders] = useState<Order[]>([]);
    const [buyOrders, setBuyOrders] = useState<Order[]>([]);
    const [myBuyOrders, setMyBuyOrders] = useState<Order[]>([]);
    const [mySellOrders, setMySellOrders] = useState<Order[]>([]);

    const router = useRouter();

    const getOrders = useCallback(async () => {
        if (window.ethereum) {
            try {
                const provider = new BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const contract = new Contract(contractAddress, abi, signer);
                const address = await signer.getAddress();

                const sellOrderIds = await contract.getOpenSellOrders();
                const buyOrderIds = await contract.getOpenBuyOrders();

                const formattedSellOrders: Order[] = [];
                for (const sellOrderIdBN of sellOrderIds) {
                    const id = parseInt(sellOrderIdBN + 1);
                    const details = await contract.sellOrder(id);
                    formattedSellOrders.push({ ...details, key: id });
                }


                const formattedBuyOrders: Order[] = [];
                for (const buyOrderIdBN of buyOrderIds) {
                    const id = parseInt(buyOrderIdBN + 1);
                    const details = await contract.buyOrder(id);
                    formattedBuyOrders.push({ ...details, key: id });
                    console.log(formattedBuyOrders);
                }

                setSellOrders(formattedSellOrders);
                setBuyOrders(formattedBuyOrders);


            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        }
    }, []);
    const getMyOrders = useCallback(async () => {
        if (window.ethereum) {
            try {
                
                const provider = new JsonRpcProvider('https://api.helium.fhenix.zone');
                const client = new FhenixClient({provider});
                let encrypted = await client.encrypt(5, EncryptionTypes.uint8);
                const signer = await provider.getSigner();
                const cleartext = client.unseal(contractAddress, sealed);
                const address = await signer.getAddress();

                const contract = new Contract(contractAddress, abi, signer);

                const sellOrderIds = await contract.myOpenSellorders();
                const buyOrderIds = await contract.myOpenBuyOrders();

                const formattedSellOrders: Order[] = [];
                for (const sellOrderIdBN of sellOrderIds) {
                    const id = parseInt(sellOrderIdBN + 1);
                    const details = await contract.sellOrder(id);
                    formattedSellOrders.push({ ...details, key: id });
                }


                const formattedBuyOrders: Order[] = [];
                for (const buyOrderIdBN of buyOrderIds) {
                    const id = parseInt(buyOrderIdBN + 1);
                    const details = await contract.buyOrder(id);
                    formattedBuyOrders.push({ ...details, key: id });
                    console.log(formattedBuyOrders, `11`);
                }
                const mySellOrders = formattedSellOrders;
                const myBuyOrders = formattedBuyOrders;
console.log(myBuyOrders);
                setMySellOrders(mySellOrders);
                setMyBuyOrders(myBuyOrders);



            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        }
    }, []);

    const handleAddOrder = () => {
        router.push('/exchange/addOrder');
    };

 
    useEffect(() => {
        getOrders();
        getMyOrders();
    }, [getOrders]);


    return (
        <div className="container mx-auto p-4 lg:p-0">
        <div className="flex flex-col lg:flex-row text-sm ">
        <aside className="w-full lg:w-2/3 p-4">
                <div className="max-w-lg">
                    <div className="flex justify-end">
                        <PlusCircleIcon
                            onClick={handleAddOrder}
                            className="h-8 mb-4 text-prosperity bg-black hover:bg-blue-700 duration-150 rounded-full cursor-pointer"
                        />
                    </div>
                    <p className="text-black mt-2 text-1xl">
                        Welcome to your No. 1 P2P trading gateway!!!
                    </p>
                    <h3 className="text-black text-1xl ml-4 font-bold sm:text-2xl">
                        My Orders
                    </h3>
                    <div className="flex flex-col">
                        {mySellOrders.map(order => (
                            <MyOrders
                                key={order.id}
                                order={order}
                                isSellOrder={true}
                            />
                        ))}
                        {myBuyOrders.map(order => (
                            <MyOrders
                                key={order.id}
                                order={order}
                                isSellOrder={false}
                            />
                        ))}
                    </div>
                    <h3 className="text-black text-1xl ml-4 font-bold sm:text-2xl">
                        Available Orders
                    </h3>

                </div>

                <div className="flex flex-col">
                    {sellOrders.map(order => (
                        <OrderCard
                            key={order.id}
                            order={order}
                            isSellOrder={true}
                        />
                    ))}
                    {buyOrders.map(order => (
                        <OrderCard
                            key={order.id}
                            order={order}
                            isSellOrder={false}
                        />
                    ))}
                </div>

            </aside>
            </div>
            <aside className="w-full lg:w-1/3 p-4 border rounded-md">

        </aside>
        </div>
    );
};

export default Main;