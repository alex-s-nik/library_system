import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AuthService } from './auth.service'
import { AuthGuard } from './auth.guard'
import { ReactiveFormsModule } from '@angular/forms'
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component'



@NgModule({
    declarations: [
        LoginComponent,
        LogoutComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
    ],
    providers: [
        AuthService,
        AuthGuard,
    ]
})
export class AuthModule { }
