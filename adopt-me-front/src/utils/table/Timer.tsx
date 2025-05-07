import {useEffect, useState} from "react";
import {Typography} from "@mui/material";
import {now} from "lodash";

type Props = {
    seconds: number
    countFrom: Date
    onTimeEnd: () => void
}

export const Timer = ({seconds, countFrom, onTimeEnd}: Props) => {
    const [timeEnd, setTimeEnd] = useState(false)
    const [remainSeconds, setRemainSeconds]
        = useState(!timeEnd ? seconds - Math.floor((now() - new Date(countFrom).getTime()) / 1000) : 0)

    useEffect(() => {
        if (!timeEnd) {
            const timeout = setTimeout(() => {
                setRemainSeconds(seconds - Math.floor((now() - new Date(countFrom).getTime()) / 1000))
                if (remainSeconds <= 0) {
                    setTimeEnd(true)
                }
            }, 1000)
            return () => clearTimeout(timeout)
        } else {
            onTimeEnd()
        }
    }, [seconds, remainSeconds])

    const displayedSeconds = remainSeconds % 60
    const displayedMinutes = Math.floor(remainSeconds / 60)

    return (
        <Typography>
            {displayedMinutes <= 9 ? `0${displayedMinutes}` : displayedMinutes}:{displayedSeconds <= 9 ? `0${displayedSeconds}` : displayedSeconds}
        </Typography>
    )
}
