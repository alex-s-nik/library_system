import { Component, Inject } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { BooksService } from '../books.service'

@Component({
    selector: 'app-book-form',
    templateUrl: './book-form.component.html',
    styleUrls: ['./book-form.component.sass']
})
export class BookFormComponent {
    constructor(
        @Inject(BooksService) private readonly _bookService: BooksService,
        @Inject(Router) private readonly _router: Router
    ) { }

    newBookForm = new FormGroup({
        title: new FormControl('', [
            Validators.required,
            Validators.maxLength(200)
        ]),
        description: new FormControl('', [
            Validators.required,
            Validators.maxLength(500)
        ])
    })
    create() {
        this.newBookForm.disable()
        this._bookService.create({
            title: this.newBookForm.get('title')!.value!,
            description: this.newBookForm.get('description')!.value!
        }).subscribe({
            next: () => this._router.navigate(['/books']),
            error: error => console.log('error adding book!', error),
            complete: () => this.newBookForm.enable()
        })
    }
}
