const AUTH_TOKEN_KEY = "authToken"

export class AuthTokenStorage {

    static getToken(): string | undefined {
        const token = localStorage.getItem(AUTH_TOKEN_KEY) ||
            sessionStorage.getItem(AUTH_TOKEN_KEY)
        return token ? `Bearer ${token}` : undefined
    }

    static removeToken(): void {
        localStorage.removeItem(AUTH_TOKEN_KEY)
        sessionStorage.removeItem(AUTH_TOKEN_KEY)
    }

    static saveToken(token: string, rememberMe: boolean): void {
        rememberMe ?
            localStorage.setItem(AUTH_TOKEN_KEY, token) :
            sessionStorage.setItem(AUTH_TOKEN_KEY, token)
    }
}