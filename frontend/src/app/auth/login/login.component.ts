import { Component, Inject } from '@angular/core'
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthService } from '../auth.service'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.sass'],
})
export class LoginComponent {
    loginForm = new FormGroup({
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required)
    });

    constructor(
        @Inject(AuthService) private authService: AuthService,
        @Inject(Router) private router: Router
    ) { }

    get usernameControl(): FormControl {
        return this.loginForm.get('username') as FormControl
    }

    get passwordControl(): FormControl {
        return this.loginForm.get('password') as FormControl
    }

    login(): void {
        let username = this.loginForm.get('username')!.value!
        let password = this.loginForm.get('password')!.value!
        this.authService.login(username, password).subscribe({
            next: () => this.router.navigateByUrl(''),
            error: err => console.log("error:", err)
        })
    }
}
