import Link from "next/link";

export const BackButton = ({ route }: { route: string }) => {
  return (
    <>
        <Link href={route} className="back-button flex justify-center items-center top-5 left-5 hover:bg-gray-300 transition-colors hover:cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="22"
            viewBox="0 0 36 22"
            fill="none"
          >
            <path
              d="M2.5 10.7673L10 2M2.5 10.7673H34M2.5 10.7673L10 19.5"
              stroke="black"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </Link>
    </>
  );
};
