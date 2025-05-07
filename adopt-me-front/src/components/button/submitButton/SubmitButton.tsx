import {Button} from "@mui/material";
import {useTranslation} from "react-i18next";

type TextType = 'send' | 'update'

type Props = {
    type?: TextType,
    disabled?: boolean
}

export const SubmitButton = ({type = 'send', disabled = false}: Props) => {
    const {t} = useTranslation()

    return (
        <Button variant='contained' color='info' type='submit' disabled={disabled}>
            {type === 'send' ? t(`commons.send`) : t(`commons.update`)}
        </Button>
    )
}