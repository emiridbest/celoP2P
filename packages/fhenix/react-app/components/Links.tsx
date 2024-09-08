import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ArchiveBoxArrowDownIcon, CubeTransparentIcon, UserGroupIcon } from '@heroicons/react/24/outline';

const Links: React.FC = () => {
    const router = useRouter();
    return (
        <div className="sm:hidden flex flex-wrap justify-around p-4 bg-prosperity rounded-lg shadow-md">
            <div className="flex flex-col items-center p-4 m-1 bg-prosperity shadow rounded-lg cursor-pointer" onClick={() => router.push('/miniSafe')}>
                <ArchiveBoxArrowDownIcon  className='h-16'
                />
                <h3 className="text-xs  text-black">Vault</h3>
            </div>
            <div className="flex flex-col items-center p-4 m-1 bg-prosperity shadow rounded-lg cursor-pointer" onClick={() => router.push('/exchange')}>
                <UserGroupIcon className='h-16'
                />
                <h3 className="text-xs  text-black">Exchange</h3>
            </div>
            <div className="flex flex-col items-center p-4 m-1 bg-prosperity shadow rounded-lg cursor-pointer" onClick={() => router.push('/socialConnect')}>
                <CubeTransparentIcon
                />
                <h3 className="text-xs mt-2 text-black">Refer2Earn</h3>
            </div>
        </div>
    );
};

export default Links;