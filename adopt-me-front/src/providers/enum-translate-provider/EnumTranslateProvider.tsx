import {createContext, ReactNode} from "react";
import {useTranslation} from "react-i18next";

export type TranslationKeyValue = { [key: string]: string };

type TranslateEnumFunction = (translations: TranslationKeyValue, value: string) => string;

type EnumTranslateContextType = {
    translateEnum: TranslateEnumFunction;
};

type Props = {
    children: ReactNode;
};

export const EnumTranslateContext = createContext<EnumTranslateContextType>({
    translateEnum: () => {
        throw new Error("TranslateEnumContext is not initialized");
    }
});

export const EnumTranslateProvider = ({children}: Props) => {
    const {t} = useTranslation()
    const translateEnum: TranslateEnumFunction = (translations, value) => {
        const translation = translations[value]
        return t(translation)
    };

    return (
        <EnumTranslateContext.Provider value={{translateEnum}}>
            {children}
        </EnumTranslateContext.Provider>
    );
};