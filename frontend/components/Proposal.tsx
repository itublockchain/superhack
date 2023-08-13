import { usePrepareContractWrite, useContractWrite, useContractRead, useAccount } from "wagmi";
import { address, abi } from "../contracts/abi";
import { ethers } from "ethers";
import { useState } from "react";

type ProposalInput = {
  proposalId: number;
  name: string;
  description: string;
  sender: `0x${string}`;
  plusVotecount: bigint;
  minusVotecount: bigint;
  deadline: bigint;
};

export const Proposal = ({
  proposalId,
  name,
  description,
  deadline,
  minusVotecount,
  plusVotecount,
  sender,
}: ProposalInput) => {

  const [ voted, setVoted ] = useState<boolean>()

  const { address: myAddress } = useAccount()

  const { config: plusConfig } = usePrepareContractWrite({
    address: address,
    abi: abi,
    functionName: "votePlus",
    args: [BigInt(proposalId)],
  });

  const { write: votePlus } = useContractWrite(plusConfig);

  const { config: minusConfig } = usePrepareContractWrite({
    address: address,
    abi: abi,
    functionName: "votePlus",
    args: [BigInt(proposalId)],
    // account: "0xff9004d37b27e7cd66c08f439198d54d68bd4ee0",
  });

  const { write: voteMinus } = useContractWrite(minusConfig);

  const { config: deleteProposalConfig } = usePrepareContractWrite({
    address: address,
    abi: abi,
    functionName: "deleteProposal",
    args: [BigInt(proposalId)]
  })

  const { write: deleteProposal } = useContractWrite( deleteProposalConfig )

  if (myAddress) {
    const { data: proposals } = useContractRead({
      address: address,
      abi: abi,
      functionName: "hasVoted",
      account: "0xff9004d37b27e7cd66c08f439198d54d68bd4ee0",
      onSettled(data, error) {
        if (data) {
          console.log(data);
          setVoted(Boolean(data))
        }
      },
      args: [myAddress, BigInt(proposalId)]
    });
  }

  return (
    <>
      {
      name && description && 
      <div className="w-full">
        <div className="m-5">
          <h1>Name: {name}</h1>
          <p>Description: {description}</p>
          <a href={`https://etherscan.io/address/${sender}`} target="_blank">
            <p>Proposer: {sender.slice(0, 5) + "..." + sender.slice(38, 42)}</p>
          </a>
        </div>
        <div className="m-5">
          <div>Deadline: {Number(deadline)}</div>
        </div>
        <button
          onClick={() => votePlus?.()}
          className="bg-green-500 hover:bg-green-700 w-48 h-16 m-5 rounded-xl disabled:bg-gray-500"
          disabled={voted}
        >
          {Number(plusVotecount)}
        </button>
        <button
          onClick={() => voteMinus?.()}
          className="bg-red-500 hover:bg-red-700 w-48 h-16 m-5 rounded-xl disabled:bg-gray-500"
          disabled={voted}
        >
          {Number(minusVotecount)}
        </button>
        {sender === myAddress && <button
          onClick={() => deleteProposal?.()}
          className="bg-red-500 hover:bg-red-700 w-48 h-16 m-5 rounded-xl"
        >
          DELETE PROPOSAL
        </button>}
      </div>}
    </>
  );
};
