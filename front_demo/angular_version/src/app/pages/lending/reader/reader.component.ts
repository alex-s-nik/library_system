import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

import { ReaderService } from '../../../reader.service';
import { SearchResult } from '../../../interfaces/search-result.interface';

import { readerIntoSearchResult } from '../../../tools/reader-into-search-result.tool';

@Component({
  selector: 'app-reader',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './reader.component.html',
  styleUrl: './reader.component.less'
})
export class ReaderComponent {

  searchResults: SearchResult[] = [];

  searchedText?: string;

  constructor(private readerService: ReaderService) { }

  findReaderByNameOrCard(event: Event): void {
    const findPattern: string = (event.target as HTMLInputElement).value;

    this.readerService.findReaderByNameOrCard(findPattern).subscribe(
      findedReaders => this.searchResults = findedReaders.map((reader) => readerIntoSearchResult(reader, findPattern))
    );
  }
}
