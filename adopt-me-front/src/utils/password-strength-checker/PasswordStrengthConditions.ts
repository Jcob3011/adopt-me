export type PasswordStrength = "poor" | "weak" | "normal" | "good"

interface PasswordStrengthCondition {
    label: PasswordStrength,
    minLength: number,
    containsUppercaseLetters: boolean,
    containsDigits: boolean,
    containsSpecialCharacters: boolean,
    color: string
}

export const passwordStrengthConditions: PasswordStrengthCondition[] = [
    {
        label: "poor",
        minLength: 1,
        containsUppercaseLetters: false,
        containsDigits: false,
        containsSpecialCharacters: false,
        color: "#F44336",
    },
    {
        label: "weak",
        minLength: 6,
        containsUppercaseLetters: true,
        containsDigits: false,
        containsSpecialCharacters: false,
        color: "#FFC107"
    },
    {
        label: "normal",
        minLength: 10,
        containsUppercaseLetters: true,
        containsDigits: true,
        containsSpecialCharacters: false,
        color: "#FFAB91"
    },
    {
        label: "good",
        minLength: 10,
        containsUppercaseLetters: true,
        containsDigits: true,
        containsSpecialCharacters: true,
        color: "#00E676"
    }
]