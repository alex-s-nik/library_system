import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Reader } from './interfaces/reader.inteface';
import { Book } from './interfaces/book.inteface';
import { LendingFact } from './interfaces/lenging-fact.inteface';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {
  
  constructor(private httpClient: HttpClient) { 
    this.httpClient.get('assets/data.json').subscribe(
      data => {
        this._libraryData = data;
        this._last_reader_id = this._libraryData.readers.length;
      }
      );
    }
    
  private _last_reader_id: number = 0;
  private _libraryData: any;


  loadInitialDB(): void {
    
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
