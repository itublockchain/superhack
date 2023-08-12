import Image from "next/image";
import { Passion_One } from "next/font/google";
import { useAccount } from "wagmi";
import { useEffect } from "react";

const passionOne = Passion_One({weight: "400", subsets: ["latin"] });

import { useContractWrite, usePrepareContractWrite, useContractRead } from "wagmi"; 
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { error } from "console";

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

  const { data: greeting, isError, isLoading } = useContractRead({
    address: '0xFc1AcEC8c78cBF3d1F5a0567e11dFfB6Fd45039D',
    abi: [{
      "inputs": [],
      "name": "greet",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }] as const,
    functionName: 'greet',
  })

  const { write: setGreeting } = useContractWrite( config )
  return (
    <>
    <div className={`h-screen flex justify-center items-center ${passionOne.className}`}>
      <ConnectButton />
      <button onClick={() => setGreeting?.()} className="connect">SET GREETING</button>
      <button className="connect">SET GREETING</button>
      {greeting}
    </div>
    </>
  );
}
