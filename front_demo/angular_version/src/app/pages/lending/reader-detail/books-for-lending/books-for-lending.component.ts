import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgFor } from '@angular/common';
import { Book } from '../../../../interfaces/book.inteface';

@Component({
  selector: 'app-books-for-lending',
  standalone: true,
  imports: [NgFor],
  templateUrl: './books-for-lending.component.html',
  styleUrl: './books-for-lending.component.less'
})
export class BooksForLendingComponent {
  @Input() listForlendingBooks: Book[] = [];
  @Output() changeLendingList = new EventEmitter<number>();

  removeBookFromLendingList(bookId: number): void {
    this.changeLendingList.emit(bookId);
  }
}