import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { BooksComponent } from './books/books.component'
import { VisitorCardComponent } from './visitors/visitor-card/visitor-card.component'
import { VisitorsComponent } from './visitors/visitors.component'

const routes: Routes = [
    { path: 'books', component: BooksComponent },
    { path: 'visitors', component: VisitorsComponent },
    { path: 'visitors/:id', component: VisitorCardComponent },
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
