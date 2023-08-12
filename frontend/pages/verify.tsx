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
        <button className="connect">VERIFY</button>
        <p className="w-1/3 text-3xl font-thin">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore fuga ducimus rem quia suscipit minima illum corporis sint, quos, sit dolorem ex quis ut animi quae iure! Deserunt incidunt odio facilis esse voluptatem inventore quas ducimus, vitae eius rerum facere nulla modi rem nesciunt laborum laudantium reprehenderit debitis culpa vel.
        </p>
      </div>
    </>
  );
}