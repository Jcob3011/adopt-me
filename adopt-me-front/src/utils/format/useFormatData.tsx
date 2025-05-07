import {useContext} from "react";
import {EnumTranslateContext, TranslationKeyValue} from "../../providers/enum-translate-provider/EnumTranslateProvider";
import {ValueType} from "../../types/ValueType";
import {asDate, asSimpleDate} from "./FormatData";

export const useFormatData = (value: any, type?: ValueType, enumTranslation?: TranslationKeyValue) => {
    const {translateEnum} = useContext(EnumTranslateContext)
    if(!value) {
        return ''
    }
    if (type) {
        switch (type) {
            case ValueType.SIMPLE_DATE:
                return asSimpleDate(value)
            case ValueType.DATE:
                return asDate(value)
        }
    }
    if(enumTranslation) {
        return translateEnum(enumTranslation, value)
    }
    return value
}