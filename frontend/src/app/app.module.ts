import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { VisitorsComponent } from './visitors/visitors.component'
import { BooksComponent } from './books/books.component'
import { VisitorCardComponent } from './visitors/visitor-card/visitor-card.component'

@NgModule({
    declarations: [
        AppComponent,
        VisitorsComponent,
        BooksComponent,
        VisitorCardComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
