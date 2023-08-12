export const Proposal = ({
  id,
  name,
  description,
  deadline,
  minusVote,
  plusVote,
}: {
  id: number;
  name: string;
  description: string;
  deadline: number;
  minusVote: number;
  plusVote: number;
}) => {
  return (
    <>
      <div className="w-full h-32">
        <p>{id}</p>
        <h1>{name}</h1>
        <p>{description}</p>
        <div>{deadline}</div>
        <div>{minusVote}</div>
        <div>{plusVote}</div>
      </div>
    </>
  );
};
