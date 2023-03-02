import { Inject, Injectable } from '@angular/core'
import { AuthService } from './auth.service'
import {
    HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http'
import { tap } from 'rxjs/operators'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    authService: any
    router: any

    constructor(@Inject(AuthService) private auth: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        // Get the auth token from the service.
        const authToken = this.auth.authorizationToken

        // Clone the request and replace the original headers with
        // cloned headers, updated with the authorization.
        const authReq = req.clone({
            headers: req.headers.set('Authorization', 'Token ' + authToken)
        })

        // send cloned request with header to the next handler.
        return next.handle(authReq).pipe(tap({
            error: (error) => {
                if (error instanceof HttpErrorResponse) {
                    switch (error.status) {
                        case 401:
                        case 403:
                            this.authService.logout()
                            this.router.navigateByUrl("/login")
                            break
                        default:
                            break
                    }
                }
            }
        }))
    }
}
