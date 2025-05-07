import {ValueType} from "../types/ValueType";

const dateSeparator = '.'
const hourSeparator = ':'

const formatDigit = (digit: number) => {
    if (digit < 10) {
        return '0' + digit
    }
    return digit.toString()
}

export const asDate = (date: Date): string => {
    return formatDigit(new Date(date).getUTCDate())
        + dateSeparator +
        formatDigit(new Date(date).getUTCMonth() + 1)
        + dateSeparator +
        new Date(date).getFullYear()
        + ' ' +
        formatDigit(new Date(date).getUTCHours())
        + hourSeparator +
        formatDigit(new Date(date).getUTCMinutes())
}

export const asSimpleDate = (date: Date): string => {
    return formatDigit(new Date(date).getUTCDate())
        + dateSeparator +
        formatDigit(new Date(date).getUTCMonth() + 1)
        + dateSeparator +
        new Date(date).getUTCFullYear()
}

export const formatValue = (value: any, type?: ValueType) => {
    if (type) {
        switch (type) {
            case ValueType.SIMPLE_DATE:
                return asSimpleDate(value)
            case ValueType.DATE:
                return asDate(value)
        }
    }
    return value
}