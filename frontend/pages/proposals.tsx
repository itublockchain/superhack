import Image from "next/image";
import { Passion_One } from "next/font/google";
import { useAccount } from "wagmi";
import { useEffect } from "react";

const passionOne = Passion_One({weight: "400", subsets: ["latin"] });

import { useContractWrite, usePrepareContractWrite } from "wagmi"; 
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Home() {
  const { config } = usePrepareContractWrite({
    address: "0xFc1AcEC8c78cBF3d1F5a0567e11dFfB6Fd45039D",
    abi: [{
      "inputs": [
        {
          "internalType": "string",
          "name": "_greeting",
          "type": "string"
        }
      ],
      "name": "setGreeting",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }] as const,
    functionName: "setGreeting",
    args: ["hello"]
  })

  const { write: setGreeting } = useContractWrite( config )
  return (
    <>
    <div className={`h-screen flex justify-center items-center ${passionOne.className}`}>
      <ConnectButton />
      <button onClick={() => setGreeting?.()} className="connect">SET GREETING</button>
    </div>
    </>
  );
}
