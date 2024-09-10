import {
  RainbowKitProvider,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { injectedWallet, metaMaskWallet } from "@rainbow-me/rainbowkit/wallets";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { celo, celoAlfajores } from "viem/chains";
import { WagmiProvider, createConfig, http } from "wagmi";
import Layout from "../components/Layout";
import "../styles/globals.css";
import { useState, useEffect, useCallback } from 'react';
import { ethers } from "ethers";
import { FhenixClient } from "fhenixjs";
import type { SupportedProvider } from "fhenixjs";

type ExtendedProvider = SupportedProvider & {
  getTransactionReceipt(txHash: string): Promise<ethers.TransactionReceipt>;
  send(method: string, params: any[] | Record<string, any>): Promise<any>;
  getSigner(): Promise<any>;
  getBalance(address: string): Promise<any>;
}

const ERROR_CHAIN_DOES_NOT_EXIST = 4902;

function App({ Component, pageProps }: AppProps) {
  const [provider, setProvider] = useState<ExtendedProvider | ethers.BrowserProvider | null>(null);
  const [fheClient, setFheClient] = useState<FhenixClient | null>(null);
  const [fnxChainId, setFnxChainId] = useState<number>(-1);
  const [isItFhenixNetwork, setIsItFhenixNetwork] = useState<boolean>(false);
  const [eventWasAdded, setEventWasAdded] = useState<boolean>(false);
  const [balance, setBalance] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  const config = {
    NETWORK_CHAIN_ID: process.env.REACT_APP_NETWORK_CHAIN_ID,
    NETWORK_RPC_URL: process.env.REACT_APP_NETWORK_RPC_URL,
    NETWORK_EXPLORER_URL: process.env.REACT_APP_NETWORK_EXPLORER_URL
  };

  useEffect(() => {
    if (window.ethereum) {
      const browserProvider = new ethers.BrowserProvider(window.ethereum);
      setProvider(browserProvider);
    }
  }, []);

  const initFHEClient = useCallback(() => {
    if (provider) {
      setFheClient(new FhenixClient({ provider }));
    }
  }, [provider]);

  const getFheClient = useCallback(() => fheClient, [fheClient]);

  const fnxConnect = useCallback(async () => {
    if (provider === null) return;

    try {
      const chainId = await provider.send('eth_chainId', []);
      if (Number(chainId) !== fnxChainId) {
        await addFhenixChain();
      }
      setFnxChainId(Number(chainId));
      await switchEthereumChain(Number(chainId));

      if (!eventWasAdded) {
        setEventWasAdded(true);
        setupMetaMaskListeners();
      }
      localStorage.setItem("isConnected", "1");
      setBalance(await getBalance());
      initFHEClient();
    } catch (err) {
      console.error('Error:', err);
    }
  }, [provider, fnxChainId, eventWasAdded, initFHEClient]);

  const addFhenixChain = useCallback(async () => {
    if (provider === null) return;

    try {
      const chainData = [{
        chainId: '0x' + (fnxChainId).toString(16),
        chainName: 'Fhenix Network',
        nativeCurrency: { name: 'FHE Token', symbol: 'FHE', decimals: 18 },
        rpcUrls: [config.NETWORK_RPC_URL],
        blockExplorerUrls: [config.NETWORK_EXPLORER_URL]
      }];
      await provider.send("wallet_addEthereumChain", chainData);
      console.log('Custom network added');
    } catch (addError) {
      console.error('Error adding custom network:', addError);
    }
  }, [provider, fnxChainId, config]);

  const switchEthereumChain = useCallback(async (chainId: number) => {
    if (!provider) return;

    try {
      await provider.send('wallet_switchEthereumChain', [{ chainId: '0x' + (chainId).toString(16) }]);
      console.log('Switched to network:', chainId);
      setIsItFhenixNetwork(Number(chainId) === fnxChainId);
    } catch (switchError) {
      console.error('Error switching networks:', switchError);
      if (switchError instanceof Error) {
        const errorDetails = (switchError as any).error;
        if (errorDetails && errorDetails.code === ERROR_CHAIN_DOES_NOT_EXIST) {
          addFhenixChain();
        }
      }
    }
  }, [provider, fnxChainId, addFhenixChain]);

  const setupMetaMaskListeners = useCallback(() => {
    window.ethereum.on('accountsChanged', async (accounts: string[]) => {
      console.log('Account changed:', accounts[0]);
      setProvider(new ethers.BrowserProvider(window.ethereum));
    });

    window.ethereum.on('chainChanged', async (chainId: number) => {
      console.log('Network changed to:', chainId);
      setFnxChainId(Number(chainId));
      setProvider(new ethers.BrowserProvider(window.ethereum));
      setIsItFhenixNetwork(Number(chainId) === fnxChainId);
    });
  }, [fnxChainId]);

  const getBalance = useCallback(async (): Promise<string> => {
    try {
      if (provider === null) return "0";
      const signer = await provider.getSigner();
      const addr = await signer.getAddress();
      setAddress(addr);
      const balance = await provider.getBalance(addr);
      return `${Number(ethers.formatEther(balance))} ETH`;
    } catch (error) {
      console.error('Error getting balance:', error);
      return "-1";
    }
  }, [provider]);

 // return {
   // isItFhenixNetwork,
   // balance,
    //address,
    //fnxConnect,
    //initFHEClient,
    //getFheClient,
    //getBalance
 // };


const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID as string; // get one at https://cloud.walletconnect.com/app

const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [injectedWallet],
    },
  ],
   {
      appName: "Celo Composer",
      projectId,
   }
  );



const queryClient = new QueryClient();

  return (
      <QueryClientProvider client={queryClient}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
      </QueryClientProvider>
  );
}

export default App;
