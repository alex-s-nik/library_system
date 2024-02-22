import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

import { Book } from '../../../interfaces/book.inteface';
import { LibraryService } from '../../../library.service';


@Component({
  selector: 'app-return-book',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './return-book.component.html',
  styleUrl: './return-book.component.less'
})
export class ReturnBookComponent implements OnInit{
  currentBook: Book | null = null;
  takenBooks: Book[] = [];

  constructor(private _libraryService: LibraryService) { }

  ngOnInit(): void {
    this.takenBooks = this._libraryService.getTakenBooks();
  }

  selectBook(bookId: number):void {
    this.currentBook = this.takenBooks.find((book) => book.id === bookId)!;
  }

  returnBookToLibrary(bookId: number): void {
    this._libraryService.returnBookToLibrary(bookId);
  }
}
