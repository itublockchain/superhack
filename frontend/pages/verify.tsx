import Image from "next/image";
import { Passion_One } from "next/font/google";
import Link from "next/link";

import { Heading } from "@/components/Heading";
import Head from "next/head";

import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
import { Abi, Narrow } from "viem";
import { optimismGoerli } from "wagmi/chains";
import { useEffect } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Logo } from "@/components";

const passionOne = Passion_One({ weight: "400", subsets: ["latin"] });

const l1contractAddress = "7c45E0ed874609Edb2797f224f725A887250C15B"

export default function Home() {

    const { address } = useAccount()

    const { config, error } = usePrepareContractWrite({
        address: `0x${l1contractAddress}`,
        abi: [{
            "name": "sendTestMessages",
            "type": "function",
            "stateMutability": "nonpayable",
            "inputs": [],
            "outputs": [],
        }] as const,
        functionName: "sendTestMessages",
        chainId: optimismGoerli.id
    })

    const { data, isLoading, isSuccess, write: verifyAddress } = useContractWrite( config )

    useEffect(() => {
        if (isSuccess) {
            window.location.href = "/verified"
        }
    }, [isSuccess])

  return (
    <>
      <div
        className={`h-screen flex flex-col gap-32 justify-center items-center ${passionOne.className}`}
      >
        <Logo />
        <div className="flex flex-col gap-5 items-center">

        {isLoading 
        ? 
        <button className="connect">VERIFYING...</button>
        :
        <button onClick={() => verifyAddress?.()} className="connect">VERIFY</button>}
        <ConnectButton />
        </div>
        
        <p className="w-1/3 text-3xl font-thin">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore fuga ducimus rem quia suscipit minima illum corporis sint, quos, sit dolorem ex quis ut animi quae iure! Deserunt incidunt odio facilis esse voluptatem inventore quas ducimus, vitae eius rerum facere nulla modi rem nesciunt laborum laudantium reprehenderit debitis culpa vel.
        </p>
      </div>
    </>
  );
}