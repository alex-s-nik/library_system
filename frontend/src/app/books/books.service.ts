import { HttpClient } from "@angular/common/http"
import { Inject, Injectable } from "@angular/core"
import { Visitor } from "../visitors/visitors.service"

const BOOKS_URL = 'api/v1/books'

@Injectable()
export class BooksService {
    constructor(@Inject(HttpClient) private readonly _http: HttpClient) { }

    list() {
        return this._http.get<Book[]>(BOOKS_URL)
    }

    get(id: Book['id']) {
        return this._http.get<Book>(`${BOOKS_URL}/${id}`)
    }

    create(book: BookCreateDto) {
        return this._http.post(BOOKS_URL + '/', book)
    }

    /** Выдать книгу */
    rent(bookId: Book['id'], visitorId: Visitor['id']) {
        return this._http.post(BOOKS_URL + `/${bookId}/taken_by/${visitorId}/`, {})
    }

    return(id: Book['id']) {
        return this._http.post(BOOKS_URL + `/${id}/was_returned/`, {})
    }
}

export type Book = {
    id: number
    title: string
    description: string
    in_library?: boolean
    created_at?: string
    created_by?: string
}

export type BookCreateDto = {
    title: string
    description: string
}
