import Link from "next/link";

export const ProfileButton = ({ route, text }: { route: string, text: string }) => {
  return (
    <>
        <Link className="profile-button flex justify-center items-center hover:bg-gray-300 transition-colors hover:cursor-pointer" href={route}>
          {text}
        </Link>
    </>
  );
};
