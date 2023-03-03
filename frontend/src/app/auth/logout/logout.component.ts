import { Component, Inject } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from '../auth.service'

@Component({
    selector: 'app-logout',
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.sass']
})
export class LogoutComponent {
    constructor(
        @Inject(AuthService) private readonly _authServuce: AuthService,
        @Inject(Router) private router: Router
    ) { }

    ngOnInit() {
        this._authServuce.logout()
        this.router.navigateByUrl('')
    }
}
