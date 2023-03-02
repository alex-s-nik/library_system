import { Component, Inject } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Book, BooksService } from '../books.service'

@Component({
    selector: 'app-book-info',
    templateUrl: './book-info.component.html',
    styleUrls: ['./book-info.component.sass']
})
export class BookInfoComponent {
    loading = false
    book: Book | undefined
    constructor(
        @Inject(ActivatedRoute) private readonly _route: ActivatedRoute,
        @Inject(BooksService) private readonly _booksService: BooksService,
    ) { }
    ngOnInit() {
        this.loading = true
        this._route.params.subscribe(params => {
            this._booksService.get(params['id']).subscribe({
                next: book => this.book = book,
                error: error => console.log('error fetching book with id = ' + params['id'], error),
                complete: () => this.loading = false
            })
        })
    }
}
