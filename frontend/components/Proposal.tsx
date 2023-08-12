import { usePrepareContractWrite, useContractWrite, useContractRead } from "wagmi";
import { address, abi } from "../contracts/abi";
import { ethers } from "ethers";

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
  });

  const { write: voteMinus } = useContractWrite(minusConfig);

  const { data: isEnded } = useContractRead({
    address: address,
    abi: abi,
    functionName: "getProposal"
  })

  return (
    <>
      <div className="w-full">
        <div className="m-5">
            <p>
                {isEnded ? "Ongoing" : "Ended"}
            </p>
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
          className="bg-green-500 hover:bg-green-700 w-48 h-16 m-5 rounded-xl"
        >
          {Number(plusVotecount)}
        </button>
        <button
          onClick={() => voteMinus?.()}
          className="bg-red-500 hover:bg-red-700 w-48 h-16 m-5 rounded-xl"
        >
          {Number(minusVotecount)}
        </button>
      </div>
    </>
  );
};
