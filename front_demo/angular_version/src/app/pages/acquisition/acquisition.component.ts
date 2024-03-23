import { Component, OnInit } from '@angular/core';
import { LibraryService } from '../../library.service';
import { Book } from '../../interfaces/book.inteface';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-acquisition',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink],
  templateUrl: './acquisition.component.html',
  styleUrl: './acquisition.component.less'
})
export class AcquisitionComponent implements OnInit {
  books: Book[] = [];
  currentBook?: Book;

  constructor(private readonly _libraryService: LibraryService) { }

  ngOnInit(): void {
    this.books = this._libraryService.getAllBooks();
  }

  setCurrent(id: number) {
    this.currentBook = this._libraryService.getBookById(id);
  }
}
