import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthGuard } from './auth/auth.guard'
import { BooksComponent } from './books/books.component'
import { LoginComponent } from './auth/login/login.component'
import { VisitorInfoComponent } from './visitors/visitor-info/visitor-info.component'
import { VisitorsComponent } from './visitors/visitors.component'
import { BookInfoComponent } from './books/book-info/book-info.component'
import { BookFormComponent } from './books/book-form/book-form.component'
import { VisitorFormComponent } from './visitors/visitor-form/visitor-form.component'

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'books', component: BooksComponent, canActivate: [AuthGuard] },
    { path: 'books/add', component: BookFormComponent, canActivate: [AuthGuard] },
    { path: 'books/:id', component: BookInfoComponent, canActivate: [AuthGuard] },
    { path: 'visitors', component: VisitorsComponent, canActivate: [AuthGuard] },
    { path: 'visitors/add', component: VisitorFormComponent, canActivate: [AuthGuard] },
    { path: 'visitors/:id', component: VisitorInfoComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: 'books' },
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
