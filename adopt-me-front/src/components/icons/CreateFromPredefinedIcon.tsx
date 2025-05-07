type Props = {
    active?: boolean
}

export const CreateFromPredefinedIcon = ({active}: Props) => {

    return <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-copy" width="24" height="24"
                viewBox="0 0 24 24" strokeWidth="2" stroke={active ? "rgb(33, 150, 243)" : "currentColor"} strokeLinecap="round"
                strokeLinejoin="round"
                fill='none'>
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M8 8m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z"></path>
        <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2"></path>
    </svg>
}