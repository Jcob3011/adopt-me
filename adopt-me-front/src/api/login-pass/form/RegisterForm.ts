export interface RegisterForm {
    firstName: string
    lastName: string
    email: string
    password: string
    role: string
    attachment: {
        name: string
        imageBase64: string
    } | undefined
}