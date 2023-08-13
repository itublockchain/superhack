import { Passion_One } from "next/font/google";
import { useState, useRef } from "react";
import { useRouter } from "next/router";

import { usePrepareContractWrite, useContractWrite } from "wagmi";
import { address, abi } from "@/contracts/abi";
import Image from "next/image";
import { ethers } from "ethers";

import { Heading } from "@/components/Heading";
import { BackButton } from "@/components";
import logo from "../public/logo.png";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const passionOne = Passion_One({ weight: "400", subsets: ["latin"] });

export default function Home() {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [deadline, setDeadline] = useState<bigint>(BigInt(0));

  const router = useRouter();

  const { config } = usePrepareContractWrite({
    address: address,
    abi: abi,
    functionName: "propose",
    args: [name, description, deadline],
  });

  const { write: addProposal } = useContractWrite({ ...config, 
    onSuccess() {
      router.push("/proposals");
    } });

  return (
    <>
      <div
        className={`h-screen flex flex-col gap-32  items-center ${passionOne.className}`}
      >
        <div className="absolute flex items-center gap-5 top-5 left-5">
        
        <BackButton route="/proposals" />
        <ConnectButton showBalance={false} />
        </div>
        <Image src={logo} alt="logo" className="absolute right-5 top-5" />
        <div className="flex items-center gap-5 mt-5">
          <Heading text={"CREATE A PROPOSAL"} />
        </div>
        <div>
          <div className="flex gap-5">
            <div className="flex flex-col">
              <label htmlFor="name" className="text-3xl">
                PROPOSAL'S TITLE
              </label>
              <input
                onChange={(e) => {
                  setName(e.currentTarget.value);
                }}
                placeholder=""
                id="name"
                className="name-input text-5xl p-2"
              ></input>
            </div>
            <div className="flex flex-col">
              <label htmlFor="name" className="text-3xl">
                PROPOSAL'S DEADLINE (DAY)
              </label>
              <input
                onChange={(e) => {
                  if (typeof Number(e.currentTarget.value)) {
                    setDeadline(BigInt(e.currentTarget.value));
                  }
                }}
                type="number"
                placeholder=""
                id="name"
                className="name-input text-5xl p-2"
              ></input>
            </div>
          </div>
          <div className="mt-2">
            <div className="flex flex-col w-full">
              <label htmlFor="name" className="text-3xl">
                PROPOSAL'S DESCRIPTION
              </label>
              <textarea
                onChange={(e) => {
                  setDescription(e.currentTarget.value);
                }}
                placeholder=""
                id="name"
                className="name-input h-72 text-5xl p-2 w-full"
              ></textarea>
            </div>
          </div>
        </div>
        <div className="flex">
          <button
            onClick={() => {
              addProposal?.();
            }}
            className="create-proposal-button text-5xl"
          >
            CREATE!
          </button>
        </div>
      </div>
    </>
  );
}
