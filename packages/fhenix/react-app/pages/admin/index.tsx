/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback, useEffect } from 'react';
import { contractAddress, abi } from '@/utils/p2pAbi';
import { BrowserProvider, Contract, ZeroAddress, ethers } from 'ethers';
import OrderCard from './orderCard';
import { useRouter } from 'next/router';



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


    const router = useRouter();

    const getOrders = useCallback(async () => {
        if (window.ethereum) {
            try {
                const provider = new BrowserProvider(window.ethereum);
                const client = new FhenixClient({provider});
                const signer = await provider.getSigner();
                const contract = new Contract(contractAddress, abi, signer);
                const address = await signer.getAddress();
                const sellOrderIds = await contract.getAllCompleteSellOrders();
                const buyOrderIds = await contract.getAllCompleteBuyOrders();

                const formattedSellOrders: Order[] = [];
                for (const sellOrderIdBN of sellOrderIds) {
                    const id = parseInt(sellOrderIdBN + 1);
                    const details = await contract.sellOrder(id);
                    const cleartext = client.unseal(contractAddress, { ...details, key: id });
                    formattedSellOrders.push(cleartext);
                }


                const formattedBuyOrders: Order[] = [];
                for (const buyOrderIdBN of buyOrderIds) {
                    const id = parseInt(buyOrderIdBN + 1);
                    const details = await contract.buyOrder(id);
                    const cleartext = client.unseal(contractAddress, { ...details, key: id });
                    formattedSellOrders.push(cleartext);
                }

                setSellOrders(formattedSellOrders);
                setBuyOrders(formattedBuyOrders);


            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        }
    }, []);

    useEffect(() => {
        getOrders();
    }, [getOrders]);


    return (
        <div className="bg-prosperity max-w-screen-xl mx-auto px-4 md:px-8">
            <div className="">
                <div className="max-w-lg">
  
                    <p className="text-black mt-2 text-1xl">
                    </p>
                    <h3 className="text-black text-1xl ml-4 font-bold sm:text-2xl">
                        Completed Orders
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

            </div>
        </div>
    );
};

export default Main;