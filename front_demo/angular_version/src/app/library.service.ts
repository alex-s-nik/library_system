import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Reader } from './interfaces/reader.inteface';
import { Book } from './interfaces/book.inteface';
import { LendingFact } from './interfaces/lenging-fact.inteface';
import * as bookData from '../assets/data.json';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {
  
  constructor(private httpClient: HttpClient) { 
    this.loadInitialDB();
    }
    
  private _last_reader_id: number = 0;
  private _libraryData: any;


  loadInitialDB(): void {
    this._libraryData = bookData;
  }

  getReaderByNameOrCard(pattern: string): Observable<Reader[]> {
    const readers: Reader[] = this._libraryData.readers;
    return of(
      readers.filter(
        (reader) => (
          reader['name'].toLowerCase().includes(pattern.toLowerCase()) || reader['card'].toLowerCase().includes(pattern.toLowerCase())
        )
      )
    );
  }

  getReaderById(id: number): Observable<Reader> {
    const reader: Reader = this._libraryData.readers.find((r: Reader) => r.id === id);
    return of(reader);
  }

  getBooksUntakenByPattern(pattern: string): Observable<Book[]> {
    const books: Book[] = this._libraryData.books;
    return of(
      books.filter(
        (b: Book) => (b.title.toLowerCase().includes(pattern.toLowerCase()) || b.author.toLowerCase().includes(pattern.toLowerCase())) && b.takenBy === null
      )
    );
  }

  /**
   * Возвращает список невыданных книг фонда библиотеки.
   * 
   * @returns Список невыданных книг
   */
  getUntakenBooks(): Book[] {
    const books: Book[] = this._libraryData.books;
    return books.filter((book) => book.takenBy === null);
  }

  takeBookToReader(readerId: number, bookId: number): void {
    const reader: Reader = this._libraryData.readers.find((r: Reader) => r.id === readerId);
    const book: Book = this._libraryData.books.find((b: Book) => b.id === bookId);

    const lendingFact: LendingFact = {
      id: 9999,
      'bookId': bookId,
      'bookInfo': `${book.author} ${book.title} / ${book.author}; - ${book.year}. - ${book.pages} с.`,
      'takenDate': new Date(),
      'returnedDate': null

    }
    reader.lendingFacts.push(lendingFact);
    book.takenBy = reader.id;
    book.takenByInfo = reader.name;
  }

  lendListBooksToReader(listBooks: Book[], reader: Reader): void {
    let currentLendingFact: LendingFact;

    for (let book of listBooks) {
      book.takenBy = reader.id;
      book.takenByInfo = reader.name;

      currentLendingFact = {
        id: 9000 + Math.floor((Math.random() * 100) + 1),
        bookId: book.id,
        bookInfo: `${book.author} ${book.title} / ${book.author}; - ${book.year}. - ${book.pages} с.`,
        takenDate: new Date(),
        returnedDate: null
      }
      reader.lendingFacts.push(currentLendingFact);
    }
  }

  createReader(readerDto: ReaderCreateDto):void {
    const reader: Reader = {
      id: this._last_reader_id++,
      name: readerDto.name,
      card: readerDto.card,
      lendingFacts: []
    };
    this._libraryData.readers.push(reader);
  }
}

export type ReaderCreateDto = {
  name: string;
  card: string;
}
