import { Passion_One } from "next/font/google";
import { useState, useRef } from "react";

import { usePrepareContractWrite, useContractWrite } from "wagmi";
import { address, abi } from "@/contracts/abi";

import { Heading } from "@/components/Heading";
import { BackButton } from "@/components";

const passionOne = Passion_One({ weight: "400", subsets: ["latin"] });



export default function Home() {

    const [name, setName] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [deadline, setDeadline] = useState<bigint>(BigInt(0))

    const { config } = usePrepareContractWrite({
        address: address,
        abi: abi,
        functionName: "propose",
        args: [name, description, deadline]
    })
    
    const { write: addProposal } = useContractWrite(config)
    
  return (
    <>
      <div
        className={`h-screen bg-white flex flex-col gap-32  items-center ${passionOne.className}`}
      >
        <BackButton route="/proposals"/>
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
              onChange={(e) => {setName(e.currentTarget.value)}}
                placeholder=""
                id="name"
                className="name-input text-5xl p-2"
              ></input>
            </div>
            <div className="flex flex-col">
              <label htmlFor="name" className="text-3xl">
                PROPOSAL'S DEADLINE
              </label>
              <input
              onChange={(e) => {setDeadline(BigInt(e.currentTarget.value))}}
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
              onChange={(e) => {setDescription(e.currentTarget.value)}}
                placeholder=""
                id="name"
                className="name-input h-72 text-5xl p-2 w-full"
              ></textarea>
            </div>
          </div>
        </div>
        <div className="flex">
            <button onClick={() => addProposal?.()} className="create-proposal-button text-5xl">CREATE!</button>
        </div>
      </div>
    </>
  );
}
