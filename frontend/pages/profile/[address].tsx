import Image from "next/image";
import { Passion_One } from "next/font/google";
import { Heading } from "@/components/Heading";
import { useRouter } from "next/router";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { useState } from "react";

const passionOne = Passion_One({ weight: "400", subsets: ["latin"] });

export default function Home() {

    const router = useRouter()
    const { address } = router.query

  return (
    <>
    <div className="flex justify-end p-5">
        <ConnectButton/>
    </div>
      <div
        className={`h-screen flex flex-col gap-32 justify-center items-center ${passionOne.className}`}
      >
        {address}
      </div>
    </>
  );
}