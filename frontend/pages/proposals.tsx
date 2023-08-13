import Image from "next/image";
import { Passion_One } from "next/font/google";
import { useAccount } from "wagmi";
import { useEffect } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ProposalSlider, ProfileButton } from "@/components";
import { Heading } from "@/components";
import logo from "../public/logo.png"

const passionOne = Passion_One({ weight: "400", subsets: ["latin"] });

export default function Proposals() {
  const { address } = useAccount();
  console.log(address);
  return (
    <>
      <div
        className={`h-screen flex flex-col justify-center items-center text-2xl ${passionOne.className}`}
      >
        <div className="flex gap-5 absolute top-5 left-5 items-center">
          <ProfileButton route={`/newproposal`} text="CREATE A PROPOSAL" />
          <ProfileButton route={`/myproposals`} text="MY PROPOSALS" />
          <ConnectButton showBalance={false} />
        </div>
        <Image src={logo} alt="logo" className="absolute right-5 top-5"/>
        <div>
          <Heading text="PROPOSALS" />
        </div>
        <ProposalSlider />
      </div>
    </>
  );
}
