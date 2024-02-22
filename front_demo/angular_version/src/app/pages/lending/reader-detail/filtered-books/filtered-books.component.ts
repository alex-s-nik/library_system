import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Book } from '../../../../interfaces/book.inteface';

@Component({
  selector: 'app-filtered-books',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './filtered-books.component.html',
  styleUrl: './filtered-books.component.less'
})
export class FilteredBooksComponent {
  @Input() untakenBooksList: Book[] = [];
  @Output() changeUntakenList = new EventEmitter<number>();

  addBookToLendingList(bookId: number): void {
    this.changeUntakenList.emit(bookId);
  }
}
