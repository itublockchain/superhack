export const Heading = ({ text } : {text: string}) => {
    return (
        <>
        <h1 className=" heading drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
            {text}
        </h1>
        </>
    )
}