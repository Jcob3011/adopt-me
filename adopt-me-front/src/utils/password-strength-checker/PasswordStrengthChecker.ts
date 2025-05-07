import {passwordStrengthConditions} from "./PasswordStrengthConditions";

export interface PasswordStrengthCheckResult {
    label: string
    color: string
}

export class PasswordStrengthChecker {

    static checkPassword = (password: string): PasswordStrengthCheckResult | undefined => {
        let passwordStrengthResult: PasswordStrengthCheckResult | undefined = undefined
        for (const condition of passwordStrengthConditions) {
            if (password.length === 0) {
                return undefined
            }

            if (password.length >= condition.minLength &&
                (!condition.containsDigits || this.containsDigits(password)) &&
                (!condition.containsUppercaseLetters || this.containsUppercaseLetters(password)) &&
                (!condition.containsSpecialCharacters || this.containsSpecialCharacters(password))) {
                passwordStrengthResult = {
                    label: condition.label,
                    color: condition.color
                }
            }
        }
        return passwordStrengthResult
    }

    private static containsDigits(password: string): boolean {
        const digitsRegex = /[0-9]/
        return digitsRegex.test(password)
    }

    private static containsUppercaseLetters(password: string): boolean {
        const uppercaseLettersRegex = /[A-Z]/
        return uppercaseLettersRegex.test(password)
    }

    private static containsSpecialCharacters(password: string): boolean {
        const specialCharactersRegex = /[!@#$%^&*]/
        return specialCharactersRegex.test(password)
    }
}