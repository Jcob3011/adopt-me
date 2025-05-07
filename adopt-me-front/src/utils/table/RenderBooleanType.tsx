import {useTranslation} from "react-i18next";

type Props = {
    isTrue: boolean
}

export const RenderBooleanType = ({isTrue}: Props) => {
    const {t} = useTranslation();
    return (
        <div>
            {isTrue ? t(`commons.yes`) : t(`commons.no`)}
        </div>
    )
}