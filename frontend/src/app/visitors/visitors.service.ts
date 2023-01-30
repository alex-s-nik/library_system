import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Book, BOOKS } from '../books/books.component'

const VISITORS: Visitor[] = [
    { id: 1, name: 'Иванов Иван Иванович', info: 'телефон 8-900-444-44-44' },
    { id: 2, name: 'Петров Пётр Петрович', info: 'нет телефона' },
    { id: 3, name: 'Тарик Рашид Николаевич', info: 'Нейросеть' },
]

const RENT: Rent[] = [
    { visitorId: 1, bookId: 1 },
    { visitorId: 1, bookId: 2 },
    { visitorId: 1, bookId: 4 }, // несуществующая книга
    { visitorId: 2, bookId: 2 },
    { visitorId: 2, bookId: 3 },
    { visitorId: 3, bookId: 1 },
    { visitorId: 3, bookId: 3 },
]

@Injectable({
    providedIn: 'root'
})
export class VisitorService {
    visitors$ = new Observable<Visitor[]>(observer => {
        observer.next(VISITORS)
        observer.complete()
    });

    constructor() { }

    getVisitor(id: Visitor['id'], rent: boolean = false) {
        return new Observable<Visitor | undefined>(observer => {
            const visitor = VISITORS.find(visitor => visitor.id === id)
            if (visitor && rent) {
                const visitorBooks = RENT.filter(rent => rent.visitorId === id)
                    .map(rent => BOOKS.find(book => book.id === rent.bookId))
                    .filter(book => book !== undefined) as Book[]
                visitor.books = visitorBooks
            }
            observer.next(visitor)
            observer.complete()
        })
    }

    getRent(visitorId: Visitor['id']) {
        return new Observable<Rent | undefined>(observer => {
            observer.next(RENT.find(rent => rent.visitorId === visitorId))
            observer.complete()
        })
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
