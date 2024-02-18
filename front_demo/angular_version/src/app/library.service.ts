import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Reader } from './interfaces/reader.inteface';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  constructor(private httpClient: HttpClient) { }

  private _libraryData: any;

  loadInitialDB(): void {
    this.httpClient.get('assets/data.json').subscribe(
      data => this._libraryData = data
    );
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
}
