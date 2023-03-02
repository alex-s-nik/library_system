import { Component, Inject } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { forkJoin, SubscriptionLike, tap } from 'rxjs'
import { Book, BooksService } from 'src/app/books/books.service'
import { Visitor, VisitorBooks, VisitorService } from '../visitors.service'

@Component({
    selector: 'app-visitor-info',
    templateUrl: './visitor-info.component.html',
    styleUrls: ['./visitor-info.component.sass']
})
export class VisitorInfoComponent {
    visitor: Visitor | undefined
    visitorbooks: VisitorBooks | undefined
    availableBooks: Book[] = []
    selectedBookId: Book['id'] | undefined
    loading = true
    _routeSubscription: SubscriptionLike

    constructor(
        @Inject(BooksService) private readonly _booksService: BooksService,
        @Inject(VisitorService) private readonly _visitorsService: VisitorService,
        private _route: ActivatedRoute
    ) {
        this._routeSubscription = this._fetch()
    }

    ngOnDestroy() {
        this._routeSubscription.unsubscribe()
    }

    rentBookHandler() {
        if (!this.selectedBookId || !this.visitor) return

        this._booksService.rent(this.selectedBookId, this.visitor.id).subscribe({
            next: () => this._fetchVisitorBooks(this.visitor!.id).subscribe(),
            error: error => console.log('error renting the book with id = ', this.selectedBookId, ':', error)
        })
    }

    returnBookHandler(id: Book['id']) {
        if (!id) return

        this._booksService.return(id).subscribe({
            next: () => this._fetchVisitorBooks(this.visitor!.id).subscribe(),
            error: error => console.log('error returning book with id = ', id, ':', error)
        })
    }

    private _fetch() {
        return this._route.params.subscribe(params => {
            forkJoin([
                this._fetchVisitor(params['id']),
                this._fetchVisitorBooks(params['id']),
                this._fetchAvailableBooks(),
            ]).subscribe({
                complete: () => {
                    this.loading = false
                    this._routeSubscription.unsubscribe()
                }
            })
        })
    }

    private _fetchVisitor(id: Visitor['id']) {
        return this._visitorsService.get(id).pipe(
            tap({
                next: visitor => this.visitor = visitor,
                error: error => console.log('error fetching visitor info with id = ' + id, error)
            })
        )
    }

    private _fetchVisitorBooks(id: Visitor['id']) {
        return this._visitorsService.books(id).pipe(
            tap({
                next: books => this.visitorbooks = books,
                error: error => console.log('error fetching visitor info with id = ' + id, error)
            })
        )
    }

    private _fetchAvailableBooks() {
        return this._booksService.list().pipe(
            tap({
                next: books => this.availableBooks = books,
                error: error => console.log('error fetching books list:', error)
            })
        )
    }
}
