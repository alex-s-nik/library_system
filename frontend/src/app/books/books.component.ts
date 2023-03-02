import { Component, Inject } from '@angular/core'
import { Router } from '@angular/router'
import { Book, BooksService } from './books.service'

@Component({
    selector: 'app-books',
    templateUrl: './books.component.html',
    styleUrls: ['./books.component.sass']
})
export class BooksComponent {
    constructor(
        @Inject(BooksService) private readonly _booksService: BooksService,
        @Inject(Router) private readonly _router: Router,
    ) { }
    books: Book[] = []
    ngOnInit() {
        this._booksService.list().subscribe({
            next: books => this.books = books,
            error: error => console.log('error fetching book list:', error)
        })
    }

    navigateToBookHandler(id: Book['id']) {
        this._router.navigate(['books', id])
    }
}
