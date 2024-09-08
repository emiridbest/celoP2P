import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

const Hero: React.FC = () => {
    const router = useRouter();
    return (
        <>
            <div className='hidden lg:block'>
                <div className="p-4">
                    <div className="p-4">
                        <div className="max-w-screen-lg mx-auto">
                            <div className="flex flex-col lg:flex-row  justify-between items-center">
                                <div className="lg:w-1/2 p-4">
                                    <header>
                                        <h3 className="text-5xl font-bold">Harness the power of peer to peer trading and  community savings.</h3>
                                    </header>
                                    <p className="mt-4 text-base">CeloP2P is built for mobile, making peer to peer transactions and saving easier.</p>
                                </div>
                                <div className="lg:w-1/2 p-4 flex justify-center lg:justify-end">
                                    <picture className="block">
                                        <Image src="/ui.png" alt="Mobile optimized. Built for you." width="420" height="420" className="max-w-full h-auto" />
                                    </picture>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap justify-around">
                        <div className="w-full sm:w-1/2 lg:w-1/4 p-4">
                            <picture className="block cursor-pointer">
                                <Image src="/save.png" onClick={() => router.push('/miniSafe')} alt="Mobile optimized. Built for you." className="max-w-full h-auto" width="120" height="120" />
                            </picture>
                            <h3 className="text-xl font-semibold mt-4">
                                <div>Save and grow</div>
                            </h3>
                            <div className="text-base">Access popular stablecoins</div>
                        </div>
                        <div className="w-full sm:w-1/2 lg:w-1/4 p-4">
                            <picture className="block cursor-pointer">
                                <Image src="/target.png" onClick={() => router.push('/')} alt="Mobile optimized. Built for you." className="max-w-full h-auto" width="120" height="120" />
                            </picture>
                            <h3 className="text-xl font-semibold mt-4">
                                <div>Set a Target.</div>
                            </h3>
                            <div className="text-base">CeloP2P is built for you, exchanging cryppto easy.</div>
                        </div>

                        <div className="w-full sm:w-1/2 lg:w-1/4 p-4">
                            <picture className="block cursor-pointer">
                                <Image src="/p2p.png" onClick={() => router.push('/exchange')} alt="Mobile optimized. Built for you." className="max-w-full h-auto" width="120" height="120" />
                            </picture>
                            <h3 className="text-xl font-semibold mt-4">
                                <div>Trade With Peers</div>
                            </h3>
                            <div className="text-base">Exchange crypto for fiat all across the world.</div>
                        </div>
                        <div className="w-full sm:w-1/2 lg:w-1/4 p-4">
                            <picture className="block cursor-pointer">
                                <Image src="/earn.png" onClick={() => router.push('/')} alt="Mobile optimized. Built for you." className="max-w-full h-auto" width="120" height="120" />
                            </picture>
                            <h3 className="text-xl font-semibold mt-4">
                                <div>Swap</div>
                            </h3>
                            <div className="text-base">Trade your stablecoins in a few clicks</div>
                        </div>
                        <div className="w-full sm:w-1/2 lg:w-1/4 p-4">
                            <picture className="block cursor-pointer">
                                <Image src="/debt.png" onClick={() => router.push('/')} alt="Mobile optimized. Built for you." className="max-w-full h-auto" width="120" height="120" />
                            </picture>
                            <h3 className="text-xl font-semibold mt-4">
                                <div>Say no to debt</div>
                            </h3>
                            <div className="text-base">You can also save with us and get your funds into a secure vault and earn rewards.</div>
                        </div>
                    </div>
                </div>
                <div className="p-4 bg-prosperity">
                    <div className="bg-gradient-to-br from-propserity-700 to-prosperity-500 bg-opacity-75 backdrop-filter backdrop-blur-lg border border-gray-300 rounded-lg shadow-lg">

                        <div className="max-w-screen-lg mx-auto">
                            <div className="flex flex-col lg:flex-row justify-between -y items-center">
                                <div className="lg:w-1/2 p-4">
                                    <header>
                                        <h3 className="text-5xl font-bold">Mobile optimized. Built for you.</h3>
                                    </header>
                                    <p className="mt-4 text-base">CeloP2P is built for mobile, making crypto easy. Swap tokens in a tap. Send crypto like a text.</p>
                                </div>
                                <div className="lg:w-1/2 p-4 flex justify-center lg:justify-end">
                                    <Image
                                        src="/earn.png"
                                        width="360"
                                        height="360"
                                        alt="Mobile optimized. Built for you."
                                        className="max-w-full h-auto" />
                                </div>
                            </div>
                        </div>                </div>

                </div><div className="p-4">
                    <div className="max-w-screen-lg bg-purple mx-auto">
                        <div className="flex flex-col lg:flex-row justify-between -y items-center">
                            <div className="lg:w-1/2 p-4">
                                <header>
                                    <h3 className="text-5xl font-bold">Communities to build wealth.</h3>
                                </header>
                                <p className="mt-4 text-base">CeloP2P streamlines and secures crypto trading.</p>
                            </div>
                            <div className="lg:w-1/2 p-4 flex justify-center lg:justify-end">
                                <Image
                                    src="/p2p.png"
                                    width="360"
                                    height="360"
                                    alt="Mobile optimized. Built for you."
                                    className="max-w-full h-auto" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-4 bg-green text-gypsum">
                    <div className="bg-gradient-to-br from-green-700 to-green-500 bg-opacity-75 backdrop-filter backdrop-blur-lg border border-gray-300 rounded-lg shadow-lg">

                        <div className="max-w-screen-lg mx-auto">
                            <div className="flex flex-col lg:flex-row justify-between -y items-center">
                                <div className="lg:w-1/2 p-4">
                                    <header>
                                        <h3 className="text-5xl font-bold">Save and Earn.</h3>
                                    </header>
                                    <p className="mt-4 text-base">Deposit your stable coins into a time-locked vault and earn CeloP2P Tokens as rewards.</p>
                                </div>
                                <div className="lg:w-1/2 p-4 flex justify-center lg:justify-end h-auto w- overlay-gypsum">
                                    <Image
                                        src="/earn.png"
                                        width="360"
                                        height="360"
                                        alt="Mobile optimized. Built for you."
                                        className="max-w-full h-auto" />
                                </div>
                            </div>                    </div>

                    </div>
                </div><div className="p-4">
                    <div className="max-w-screen-lg mx-auto">
                        <div className="flex flex-col lg:flex-row justify-between -y items-center">
                            <div className="lg:w-1/2 p-4">
                                <header>
                                    <h3 className="text-5xl font-bold">Say no to debts.</h3>
                                </header>
                                <p className="mt-4 text-base">CeloP2P brings prosperity to all, enriching lives.</p>
                            </div>
                            <div className="lg:w-1/2 p-4 flex justify-center lg:justify-end">
                                <Image
                                    src="/debt.png"
                                    width="360"
                                    height="360"
                                    alt="Mobile optimized. Built for you."
                                    className="max-w-full h-auto" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Hero;
