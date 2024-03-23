import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { type Book } from '../../../../interfaces/book.inteface';

@Component({
  selector: 'app-books-for-lending',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './books-for-lending.component.html',
  styleUrl: './books-for-lending.component.less'
})
export class BooksForLendingComponent {
  @Input() listForlendingBooks: Book[] = [];
  @Output() changeLendingList = new EventEmitter<number>();

  removeBookFromLendingList (bookId: number): void {
  	this.changeLendingList.emit(bookId);
  }
}
