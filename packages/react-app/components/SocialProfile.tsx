import React, { useCallback, useEffect, useState } from "react";
import { useSocialConnect } from "@/SocialConnect/useSocialConnect";
import { useSession } from "next-auth/react";

const SocialConnectUI: React.FC = () => {
  const { account, lookupAddress } = useSocialConnect();
  const [loading, setLoading] = useState(false);
  const [odisRegisteredAddresses, setOdisRegisteredAddresses] = useState("");
  const { data: session } = useSession();

  const getLookupAddress = async () => {
    if (session) {
      setLoading(true);
      try {
        const addresses = await lookupAddress((session as any)?.username);
        if (addresses) {
          setOdisRegisteredAddresses(addresses);
        } else {
          setOdisRegisteredAddresses("");
        }
      } catch (error) {
        console.error("Error fetching addresses:", error);
        setOdisRegisteredAddresses("");
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <div className="social-connect-ui">
      <div className="text-sm text-gray-500 mt-5">
        <p>
          Username:{" "}
          <span className="text-black font-bold">
            {(session as any)?.username}
          </span>
        </p>
        <p>
          Address:{" "}
          <span className="text-black font-bold">
            {account?.substring(0, 5)}...
            {account?.substring(account.length - 5, account.length)}
          </span>
        </p>
        <p>
          Provider:{" "}
          <span className="text-black font-bold">
            {process.env.NEXT_PUBLIC_SOCIAL_CONNECT_PROVIDER === "GITHUB"
              ? "Github"
              : "Twitter"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default SocialConnectUI;
