import { HttpClient } from '@angular/common/http'
import { Inject, Injectable } from '@angular/core'
import { Book } from '../books/books.service'

const VISITORS_URL = 'api/v1/visitors'

@Injectable({
    providedIn: 'root'
})
export class VisitorService {
    constructor(
        @Inject(HttpClient) private readonly _http: HttpClient
    ) { }

    list() {
        return this._http.get<Visitor[]>(VISITORS_URL)
    }

    get(id: Visitor['id']) {
        return this._http.get<Visitor>(`${VISITORS_URL}/${id}`)
    }

    create(book: VisitorCreateDto) {
        return this._http.post(VISITORS_URL + '/', book)
    }

    books(id: Visitor['id']) {
        return this._http.get<VisitorBooks>(VISITORS_URL + `/${id}/books`)
    }
}

type Rent = {
    visitorId: Visitor['id']
    bookId: Book['id']
}

export type Visitor = {
    id: number
    name: string
    info: string
    books?: Book[]
}

export type VisitorCreateDto = {
    name: string,
    info: string
}

export type VisitorBooks = {
    visitor: Visitor,
    books: Book[]
}
