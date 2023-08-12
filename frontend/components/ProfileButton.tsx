export const ProfileButton = ({ route }: { route: string }) => {
  return (
    <>
        <a href={route} className="profile-button absolute flex justify-center items-center top-5 right-5 hover:bg-gray-300 transition-colors hover:cursor-pointer">
          MY PROFILE
        </a>
    </>
  );
};
