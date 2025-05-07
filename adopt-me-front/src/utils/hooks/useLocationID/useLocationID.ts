import {useLocation} from "react-router-dom";

export function useLocationID() {
    return useLocation().pathname.split('/').filter(value => value != '').pop()
}