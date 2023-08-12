import Image from "next/image";
import { Passion_One } from "next/font/google";
import Link from "next/link";

import { Heading } from "@/components/Heading";
import Head from "next/head";

const passionOne = Passion_One({ weight: "400", subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <div
        className={`h-screen flex flex-col gap-32 justify-center items-center ${passionOne.className}`}
      >
        <div className="flex items-center gap-5">
          <Heading text={"VERIFICATION FAILED"} />
        </div>
        <button className="connect">VERIFY</button>
      </div>
    </>
  );
}