import Image from "next/image";
import logo from "../public/logo.png"

export const Logo = () => {
    return <>
    <div className="w-full absolute top-0 flex justify-center mt-5">
        <Image src={logo} alt={"logo"} className="w-[300px]" />
    </div>
    </>
}