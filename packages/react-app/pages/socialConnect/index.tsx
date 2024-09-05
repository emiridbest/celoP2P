import React, { useState, useCallback, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Contract, formatUnits, BrowserProvider } from 'ethers';
import { useAccount } from 'wagmi';
import { CurrencyPoundIcon } from '@heroicons/react/24/outline';
import { useSocialConnect } from "@/SocialConnect/useSocialConnect";
import SocialProfile from '@/components/SocialProfile';
import { abi, contractAddress } from '@/utils/abi';
import { useSession } from "next-auth/react";

const Loader = ({ alt }: { alt?: boolean }) => (
  <div className={`loader ${alt ? 'loader-alt' : ''}`}>Loading...</div>
);

export default function Home() {
  const { account, lookupAddress } = useSocialConnect();
  const { data: session } = useSession();

  const { address } = useAccount();
  const [upliner, setUpliner] = useState('');
  const [downliners, setDownliners] = useState<string[]>([]);
  const [tokenIncentive, setTokenIncentive] = useState<string>('0');

  // Fetch downliners on component mount
  useEffect(() => {
    if (address) {
      handleGetDownliners();
    }
  }, );

  // Function to get downliners
  const handleGetDownliners = useCallback(async () => {
    if (window.ethereum && address) {
      try {
        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner(address);
        const contract = new Contract(contractAddress, abi, signer);

        const downlinersArray = await contract.getDownliners(address);
        setDownliners(downlinersArray);
      } catch (error) {
        console.error('Error fetching downliners:', error);
        toast.error('Error fetching downliners');
      }
    }
  }, [address]);

  // Function to set upliner
  const handleSetUpliner = async (event: React.FormEvent) => {
    event.preventDefault();
    if (window.ethereum) {
      try {
        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner(address);
        const contract = new Contract(contractAddress, abi, signer);
        const uplinerAddress = await lookupAddress(upliner);
        console.log(uplinerAddress);
        await contract.setUpliner(uplinerAddress);
        toast.success('Upliner set successfully');
      } catch (error) {
        console.error('Error setting upliner:', error);
        toast.error('Error setting upliner');
      }
    }
  }

  // Function to get token incentive balance
  const handleGetTokenIncentive = async () => {
    if (window.ethereum) {
      try {
        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner(address);
        const contract = new Contract(contractAddress, abi, signer);

        const tokenBalance = await contract.balanceOf(address);
        if (tokenBalance !== undefined) {
          const tokenBalanceBigInt = formatUnits(tokenBalance, 0);
          setTokenIncentive(tokenBalanceBigInt.toString());
        }
      } catch (error) {
        console.error('Error fetching token balance:', error);
        toast.error('Error fetching token balance');
      }
    }
  }

  // Fetch balances and token incentive on component mount
  useEffect(() => {
    if (address) {
      handleGetTokenIncentive();
    }
  }, [address, handleGetTokenIncentive]);

  if (!account) {
    return (
      <div className="container mx-auto p-4 lg:p-0">
        <ToastContainer />
        <div className="flex justify-center items-center h-screen">
          <Loader alt />
        </div>
      </div>
    );
  }
  return (
   <div className="container mx-auto p-4 lg:p-0">
      <ToastContainer />
      {account ?  <div className="flex flex-col lg:flex-row text-sm">
        <main className="w-full lg:w-2/3 p-4">
       <div className="bg-gradient-to-br from-gypsum to-gray-50 bg-opacity-75 backdrop-filter backdrop-blur-lg border border-gray-300 rounded-lg shadow-lg">
            <div className="p-6">
            <SocialProfile />
              <h3 className="font-semibold text-black mb-4 text-lg">My Savings</h3>
              <div className="mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">
                    <CurrencyPoundIcon className="mr-2 text-black" />
                    EST:
                  </span>
                  <span className="text-black text-2xl font-bold">{tokenIncentive} EST</span>
                </div>
              </div>
              <div>
              </div>
            </div>
          </div>
        </main>
        <aside className="w-full lg:w-1/3 p-4 border rounded-md">
          <div className="bg-gradient-to-br from-gypsum to-gray-50 bg-opacity-75 backdrop-filter backdrop-blur-lg border border-gray-300 rounded-lg shadow-lg">
            <h3 className="text-sm   m-4 text-black mb-2">Actions</h3>
            <div className="p-6 space-y-4">
              <div>
                  <div>
                    <label htmlFor="upliner" className="block text-gray-600 mb-2">
                      Enter Upliner Address
                    </label>
                    <input
                      id="upliner"
                      type="text"
                      value={upliner}
                      onChange={(e) => setUpliner(String(e.target.value))}
                      className="w-full border rounded-md p-2 text-black"
                    />
                    <button
                      onClick={handleSetUpliner}
                      className="mt-2 bg-prosperity text-black hover:bg-black hover:text-white px-4 py-2 rounded-md"
                    >
                      Set Upliner
                    </button>
                  </div>
              </div>
              <div>
                <div className="bg-prosperity text-black hover:bg-black hover:text-white px-4 py-2 rounded-md  cursor-pointer"
                >
                  Downliners
                </div>
                <div className="mt-2 border p-2">
                  {downliners.length > 0 ? (
                    downliners.map((dl, index) => <div key={index}>{dl}</div>)
                  ) : (
                    <div>No downliners</div>
                  )}
                </div>
              </div>
              <div>
                <div className="bg-prosperity text-black hover:bg-black hover:text-white px-4 py-2 rounded-md cursor-pointer"
                >
                  Token Incentive Balance
                </div>
                <div className="mt-2 border p-2">
                  EST: {tokenIncentive}
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div> : "Click on SocialConnect to get started"}
    </div>
  );
}
