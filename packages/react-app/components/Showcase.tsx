import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';


const Showcase: React.FC = () => {
  const router = useRouter();
  return (
    <div className='hidden lg:block bg-gypsum'>
      <h2 className="text-2xl font-bold mb-4">
        <div>Do more with your crypto with CeloP2P</div>
      </h2>
      <div className="flex flex-wrap justify-around">
        <div className="w-full sm:w-1/2 lg:w-1/4 p-4">
        <picture className="block cursor-pointer">
            <Image src="/celoGreen.png" onClick={() => router.push('/')} alt="Mobile optimized. Built for you." className="max-w-full h-auto" width="940" height="940" />
          </picture>
          <h3 className="text-xl font-semibold mt-4">
            <div>Trade</div>
          </h3>
          <div className="text-base">CeloP2P utilizes sign protocol to safeguard peer to peer transactions.</div>
        </div>
        <div className="w-full sm:w-1/2 lg:w-1/4 p-4">
          <picture className="block cursor-pointer">
            <Image src="/miniPay.png" onClick={() => router.push('/')} alt="Mobile optimized. Built for you." className="max-w-full h-auto" width="940" height="940" />
          </picture>
          <h3 className="text-xl font-semibold mt-4">
            <div>Mobile optimized. Built for you.</div>
          </h3>
          <div className="text-base">CeloP2P is built for mobile, making crypto trades easy.</div>
        </div>
        <div className="w-full sm:w-1/2 lg:w-1/4 p-4">
          <picture className="block cursor-pointer">
            <Image src="/ui.png" onClick={() => router.push('/')} alt="Mobile optimized. Built for you." className="max-w-full h-auto" width="940" height="940" />
          </picture>
          <h3 className="text-xl font-semibold mt-4">
            <div>Swap</div>
          </h3>
          <div className="text-base">Trade tokens in a few clicks while on the go!!!</div>
        </div>
        <div className="w-full sm:w-1/2 lg:w-1/4 p-4">
          <picture className="block cursor-pointer">
            <Image src="/celo.png" onClick={() => router.push('/')} alt="Mobile optimized. Built for you." className="max-w-full h-auto" width="420" height="420" />
          </picture>
          <h3 className="text-xl font-semibold mt-4">
            <div>Explore</div>
          </h3>
          <div className="text-base">Explore a range of web3 apps</div>
        </div>
      </div>
    </div>

  );
};

export default Showcase;
