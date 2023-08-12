import Image from "next/image";
import { Passion_One } from "next/font/google";
import { useAccount } from "wagmi";
import { useEffect } from "react";

const passionOne = Passion_One({weight: "400", subsets: ["latin"] });

import { error } from "console";

export default function Home() {
  return (
    <>
    <div className={`h-screen flex justify-center items-center ${passionOne.className}`}>
    </div>
    </>
  );
}
