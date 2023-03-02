import { HttpClient } from "@angular/common/http"
import { Inject, Injectable } from "@angular/core"
import { tap } from "rxjs"

const AUTH_URL = 'api/v1/auth/token/login'
const AUTH_TOKEN_NAME = 'myLibraryAccessToken'

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(@Inject(HttpClient) private readonly _http: HttpClient) { }

    set authorizationToken(value) {
        if (!value) return

        localStorage.setItem(AUTH_TOKEN_NAME, value)
    }
    get authorizationToken() {
        return localStorage.getItem(AUTH_TOKEN_NAME)
    }

    login(username: string, password: string) {
        const requestBody = {
            username: username,
            password: password
        }
        return this._http.post<tokenResponse>(AUTH_URL, requestBody)
            .pipe(
                tap({
                    next: (value) => {
                        this.authorizationToken = value.auth_token
                    }
                })
            )
    }

    logout(): void {
        localStorage.removeItem(AUTH_TOKEN_NAME)
    }

    isUserLoggedIn() {
        return !!localStorage.getItem(AUTH_TOKEN_NAME)
    }
}

type tokenResponse = {
    auth_token: string
}
