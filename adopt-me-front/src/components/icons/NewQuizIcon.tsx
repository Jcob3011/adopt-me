type Props = {
    active?: boolean
}

export const NewQuizIcon = ({active}: Props) => {

    return <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-file-plus" width="24"
                height="24" viewBox="0 0 24 24" strokeWidth="2" stroke={active ? "rgb(33, 150, 243)": "currentColor"}
                strokeLinecap="round" strokeLinejoin="round" fill="none"
    >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
        <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"></path>
        <path d="M12 11l0 6"></path>
        <path d="M9 14l6 0"></path>
    </svg>
}