import { useState } from "react";
import { useChain } from "./useChain";

export default function useFHE() {
  const [encryptedText, setEncryptedText] = useState<string>("");
  const { getFheClient } = useChain();
  const encrypt = async (element: HTMLInputElement | null) => {
    try {
      if (element !== null && element.value !== "") {
        const value = Number(element.value);
        const fheClient = getFheClient();
        if (fheClient !== null) {
          // We use uint16 for the template, but you can use encrypt_uint8/16/32
          const uint8Array = (await fheClient.encrypt_uint16(value)).data;
          setEncryptedText(
            `0x${Array.from(uint8Array)
              .map((b) => b.toString(16).padStart(2, "0"))
              .join("")}`
          );
        }
      }
    } catch (err: any) {
      setEncryptedText(`Error: ${err.reason}`);
    }
  };

  return { encrypt, encryptedText };
}
