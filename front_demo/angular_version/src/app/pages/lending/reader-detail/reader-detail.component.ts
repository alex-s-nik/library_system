import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { DatePipe } from '@angular/common';
import { LibraryService } from '../../../library.service';
import { Reader } from '../../../interfaces/reader.inteface';
import { Book } from '../../../interfaces/book.inteface';

@Component({
  selector: 'app-reader-detail',
  standalone: true,
  imports: [DatePipe, NgFor, NgIf],
  templateUrl: './reader-detail.component.html',
  styleUrl: './reader-detail.component.less'
})
export class ReaderDetailComponent implements OnInit {
  reader?: Reader;
  books?: Book[];

  constructor(private libraryService: LibraryService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getReader();
    if (!this.reader) {
      this.router.navigate(['/404'])
    }
  }

  getReader(): void {
    const id: number = Number(this.route.snapshot.paramMap.get('id'));
    this.libraryService.getReaderById(id).subscribe(reader => this.reader = reader);
  }

  findBooks(event: Event): void {
    const findPattern: string = (event.target as HTMLInputElement).value;
    this.findBooksByPattern(findPattern);
  }

  findBooksByPattern(findPattern: string): void {
    this.libraryService.getBooksUntakenByPattern(findPattern).subscribe(
      books => this.books = books
    );
  }

  takeBook(readerId: number, bookId: number): void {
    this.libraryService.takeBookToReader(readerId, bookId);
  }
}
