import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

import { type SearchReaderResult } from '../../../interfaces/search-result.interface';

import { readerIntoSearchResult } from '../../../tools/reader-into-search-result.tool';
import { LibraryService } from '../../../library.service';

@Component({
  selector: 'app-reader',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './reader.component.html',
  styleUrl: './reader.component.less'
})
export class ReaderComponent {
  searchResults: SearchReaderResult[] = [];

  searchedText?: string;

  constructor(private readonly libraryService: LibraryService) { }

  findReaderByNameOrCard(event: Event): void {
    const findPattern: string = (event.target as HTMLInputElement).value;
    this.libraryService.getReaderByNameOrCard(findPattern).subscribe(
      findedReaders => this.searchResults = findedReaders.map((reader) => readerIntoSearchResult(reader, findPattern))
    );
  }
}
