import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Reader } from './interfaces/reader.inteface';
import { READERS } from './mock-readers';

@Injectable({
  providedIn: 'root'
})
export class ReaderService {

  constructor() { }

  findReaderByNameOrCard(pattern: string): Observable<Reader[]> {
    const findedReaders: Reader[] = READERS.filter(
      (reader) =>
      (
        reader["name"].toLowerCase().includes(pattern.toLowerCase()) || reader["card"].toLowerCase().includes(pattern.toLowerCase())
      )
    )

    return of(findedReaders)
  }
}