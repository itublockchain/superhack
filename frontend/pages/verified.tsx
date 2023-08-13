import Image from "next/image";
import { Passion_One } from "next/font/google";
import Link from "next/link";

import { Heading } from "@/components/Heading";
import Head from "next/head";
import { Logo } from "@/components";

const passionOne = Passion_One({ weight: "400", subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <div
        className={`h-screen flex flex-col gap-32 justify-center items-center ${passionOne.className}`}
      >
        <Logo />
        <div className="flex items-center gap-5">
          <Heading text={"VERIFIED"} />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="66"
            viewBox="0 0 64 66"
            fill="none"
          >
            <path
              d="M9 41.3316L25.2515 57L55 9"
              stroke="url(#paint0_linear_9_52)"
              stroke-width="17"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <defs>
              <linearGradient
                id="paint0_linear_9_52"
                x1="42"
                y1="9"
                x2="-8"
                y2="111"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0.38721" stop-color="#0554F2" />
                <stop offset="1" stop-color="#F20732" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <Link href="/proposals" className="connect">GO TO PROPOSALS</Link>
      </div>
    </>
  );
}
