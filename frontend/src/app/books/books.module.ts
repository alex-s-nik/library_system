import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { BooksService } from './books.service'
import { BooksComponent } from './books.component';
import { BookFormComponent } from './book-form/book-form.component';
import { BookInfoComponent } from './book-info/book-info.component'
import { RouterModule } from '@angular/router'
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
    declarations: [
        BooksComponent,
        BookFormComponent,
        BookInfoComponent,
    ],
    imports: [
        RouterModule,
        ReactiveFormsModule,
        CommonModule
    ],
    providers: [
        BooksService,
    ]
})
export class BooksModule { }
