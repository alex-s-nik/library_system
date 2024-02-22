import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { DatePipe } from '@angular/common';
import { LibraryService } from '../../../library.service';
import { Reader } from '../../../interfaces/reader.inteface';
import { Book } from '../../../interfaces/book.inteface';
import { FilteredBooksComponent } from './filtered-books/filtered-books.component';
import { BooksForLendingComponent } from './books-for-lending/books-for-lending.component';
import { log } from 'console';

@Component({
  selector: 'app-reader-detail',
  standalone: true,
  imports: [DatePipe, NgFor, NgIf, FilteredBooksComponent, BooksForLendingComponent],
  templateUrl: './reader-detail.component.html',
  styleUrl: './reader-detail.component.less'
})
export class ReaderDetailComponent implements OnInit {
  reader?: Reader;
  books?: Book[];

  // список еще не выданных книг
  public untakenBooksList: Book[] = [];
  // список книг, помеченных для выдачи текущему читателю
  public listForlendingBooks: Book[] = [];

  constructor(private libraryService: LibraryService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getReader();
    if (!this.reader) {
      this.router.navigate(['/404'])
    }
    this.untakenBooksList = this.getUntakenBooks();
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

  lendListBooksToReader(): void {
    this._lendListBooksToReader(this.listForlendingBooks, this.reader!);
    this.listForlendingBooks = [];
  }
  /**
   * Выдать книги читателю reader из списка для выдачи книг текущему читателю.
   * 
   * @param listBooks список книг, которые будут выданы
   * @param reader читатель
   */
  _lendListBooksToReader(listBooks: Book[], reader: Reader): void {
    this.libraryService.lendListBooksToReader(listBooks, reader);
  }

  /**
   * Получить список книг, находящихся библиотеке (невыданных книг)
   * 
   * @returns Список невыданных книг
   */
  getUntakenBooks(): Book[] {
    return this.libraryService.getUntakenBooks();
  }


  /**
   * Обработка события, возникающего при щелчке (выборе) по книге в списке невыданных книг
   * 
   * @param bookId id невыданной книги
   */
  addBookToLendingListHandler(bookId: number): void {
    this.addBookToLendingList(bookId);
  }

  /**
   * Обработка события, возникающего при щелчке (выборе) по книге в списке книг
   * для выдачи текущему читателю
   * 
   * @param bookTitle id книги из списка книг для выдачи текущему читателю
   */
  removeBookFromOrderListHandler(bookId: number): void {
    this.removeBookFromOrderList(bookId);
  }

  /**
   * Перемещает книгу из общего списка книг невыданных книг в список книг для выдачи
   * текущему читателю.
   * 
   * @param bookId id невыданной книги
   */
  addBookToLendingList(bookId: number): void {
    this._moveBookBetweenLists(bookId, this.untakenBooksList, this.listForlendingBooks);
  }

  /**
   * Перемещает книгу из общего списка книг невыданных книг в список книг для выдачи
   * текущему читателю.
   * 
   * @param bookId id невыданной книги
   */
  removeBookFromOrderList(bookId: number): void {
    this._moveBookBetweenLists(bookId, this.listForlendingBooks, this.untakenBooksList);
  }

  /**
   * Перемещает книгу из одного списка в другой.
   * 
   * @param bookId id книги, которую надо переместить
   * @param fromList список, из которого надо переместить
   * @param toList список, в который надо переместить
   */
  _moveBookBetweenLists(bookId: number, fromList: Book[], toList: Book[]): void {
    const book: Book = fromList.find(book=>book.id === bookId)!;
    const index: number = fromList.indexOf(book);
    fromList.splice(index, 1);
    toList.push(book);
  }
}
