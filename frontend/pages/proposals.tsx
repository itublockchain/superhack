import Image from "next/image";
import { Passion_One } from "next/font/google";
import { useAccount } from "wagmi";
import { useEffect } from "react";
import { ProposalSlider } from "@/components";

const passionOne = Passion_One({weight: "400", subsets: ["latin"] });

import { error } from "console";

export default function Home() {
  return (
    <>
    <div className={`h-screen bg-white flex justify-center text-2xl ${passionOne.className}`}>
      <ProposalSlider />
    </div>
    </>
  );
}
