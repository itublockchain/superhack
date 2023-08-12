import { useContractRead } from "wagmi";
import { address, abi } from "../contracts/abi";
import { Proposal } from ".";
import { useState } from "react";

type IProposal = {
  name: string;
  description: string;
  sender: `0x${string}`;
  plusVotecount: bigint;
  minusVotecount: bigint;
  deadline: bigint;
};

export const ProposalSlider = () => {
  const [proposalArray, setProposalArray] = useState<any>();

  const { data: proposals } = useContractRead({
    address: address,
    abi: abi,
    functionName: "getProposals",
    onSettled(data, error) {
      if (data) {
        setProposalArray(data);
      }
    },
  });

  console.log(proposalArray);
  return (
    <>
      <div className="w-1/2 h-screen overflow-scroll text-center">
        {proposalArray?.map((proposal: IProposal, index: number) => {
          return (
            <Proposal
              key={index}
              proposalId={index}
              sender={proposal.sender}
              name={proposal.name}
              description={proposal.description}
              deadline={proposal.deadline}
              minusVotecount={proposal.minusVotecount}
              plusVotecount={proposal.plusVotecount}
            />
          );
        })}
      </div>
    </>
  );
};
