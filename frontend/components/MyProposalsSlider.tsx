import { useAccount, useContractRead } from "wagmi";
import { address, abi } from "../contracts/abi";
import { Proposal } from ".";
import { useState } from "react";

type IProposal = {
  name: string;
  description: string;
  sender: `0x${string}`;
  plusVotecount: bigint;
  minusVotecount: bigint;
  deadline: number;
};

export const MyProposalsSlider = () => {
  const startTime = Math.floor(Date.now() / 1000);
  const [proposalArray, setProposalArray] = useState<any>();

  const { address: myAddress } = useAccount()

  const { data: proposals } = useContractRead({
    address: address,
    abi: abi,
    functionName: "getProposals",
    account: "0xff9004d37b27e7cd66c08f439198d54d68bd4ee0",
    onSettled(data, error) {
      if (data) {
        console.log("settled")
        setProposalArray(data);
      }
    },
  });

  console.log(proposalArray);
  return (
    <>
      <div className="overflow-scroll text-center proposal-slider">
        {proposalArray?.map((proposal: IProposal, index: number) => {
          if (myAddress === proposal.sender) {return (
            <Proposal
              key={index}
              proposalId={index}
              sender={proposal.sender}
              name={proposal.name}
              description={proposal.description}
              deadline={Number(proposal.deadline) / startTime}
              minusVotecount={proposal.minusVotecount}
              plusVotecount={proposal.plusVotecount}
            />
          );}
        })}
      </div>
    </>
  );
};
