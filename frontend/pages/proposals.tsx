import Image from "next/image";
import { Passion_One } from "next/font/google";
import { useAccount } from "wagmi";
import { useEffect } from "react";
import { ProposalSlider, ProfileButton } from "@/components";

const passionOne = Passion_One({weight: "400", subsets: ["latin"] });

import { error } from "console";

export default function Proposals() {

  const { address } = useAccount()
  console.log(address)
  return (
    <>
    <div className={`h-screen bg-white flex justify-center text-2xl ${passionOne.className}`}>
      <ProfileButton route={`/profile/${address}`} />
      <ProposalSlider />
    </div>
    </>
  );
}
