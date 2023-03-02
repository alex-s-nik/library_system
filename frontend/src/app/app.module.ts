import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { AuthInterceptor } from './auth/auth-interceptor'
import { AuthModule } from './auth/auth.module'
import { AuthService } from './auth/auth.service'
import { BooksModule } from './books/books.module'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { VisitorsModule } from './visitors/visitors.module'

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        AuthModule,
        BooksModule,
        VisitorsModule,
    ],
    providers: [
        AuthService,
        [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
