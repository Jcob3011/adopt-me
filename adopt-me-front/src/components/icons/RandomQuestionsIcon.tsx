type Props = {
    active?: boolean
}
export const RandomQuestionsIcon = ({active}: Props) => {

    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrows-shuffle-2" width="24"
             height="24" viewBox="0 0 24 24" strokeWidth="2" stroke={active ? "rgb(33, 150, 243)": "currentColor"} fill="none"
             strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M18 4l3 3l-3 3"></path>
            <path d="M18 20l3 -3l-3 -3"></path>
            <path d="M3 7h3a5 5 0 0 1 5 5a5 5 0 0 0 5 5h5"></path>
            <path d="M3 17h3a5 5 0 0 0 5 -5a5 5 0 0 1 5 -5h5"></path>
        </svg>
    )
}