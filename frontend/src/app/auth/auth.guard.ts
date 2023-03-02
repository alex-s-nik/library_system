import { Inject, Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanMatch, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router'
import { Observable } from 'rxjs'
import { AuthService } from './auth.service'

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanMatch {

    constructor(
        @Inject(AuthService) private readonly authService: AuthService,
        @Inject(Router) private readonly router: Router
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this._authenticate()
    }
    canActivateChild(
        childRoute: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this._authenticate()
    }
    canMatch(
        route: Route,
        segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this._authenticate()
    }

    private _authenticate(): boolean {
        if (!this.authService.isUserLoggedIn()) {
            this.router.navigateByUrl("/login")
            return false
        } else {
            return true
        }
    }
}
