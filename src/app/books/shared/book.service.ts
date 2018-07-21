import { Injectable } from '@angular/core';
import { Book } from './book';
import { FlashMessageService } from '../../flash-message/shared/flash-message.service';
import { MockBooks } from './mock-books';
import { BookResponse } from './book-response';

@Injectable()
export class BookService {

  static PER_PAGE = 10;

  books: Book[] = MockBooks;

  constructor(private flashMessageService: FlashMessageService) { }

  getBooks(page = 1): BookResponse {
    const startIndex = (page - 1) * BookService.PER_PAGE;
    const books = this.books
      .slice(startIndex, startIndex + BookService.PER_PAGE);
    return {
      books,
      currentPage: page,
      totalPages: Math.ceil(this.books.length / BookService.PER_PAGE)
    }
  }

  getBook(id: number): Book {
    const index = this.books.findIndex(book => book.id === (+id));
    const { title, description } = this.books[index];
    const prevBook = this.books[index - 1];
    const nextBook = this.books[index + 1];

    return {
      id,
      title,
      description,
      prevId: prevBook? prevBook.id : null,
      nextId: nextBook? nextBook.id : null
    };
    // currentBook.prevId = prevBook? prevBook.id : null;
    // currentBook.nextId = nextBook? nextBook.id : null;
    // return currentBook;
  }

  getContent(id: number): string {
    return this.findBook(id).content;
  }

  getReview(id: number): string[] {
    return this.findBook(id).reviews;
  }

  createBook(book: Book) {
    book.id = this.books.length + 1;

    this.books = [
      ...this.books, book
    ];

    this.flashMessageService.addMessage('success', 'The book has been created');
  }

  updateBook(id: number, book: Book){
    //const index = this.books.findIndex(book => book.id === id);

    const index = this.books.findIndex(b => b.id === (+id));

    book.id = this.books[index].id;
     
    //console.log(this.books[0]);
    this.books = [
      ...this.books.slice(0, index), 
      book,
      ...this.books.slice(index +1)
    ]

    this.flashMessageService.addMessage('success', 'The book has been updated');
  }

  private findBook(id: number): Book {
    return this.books.find(book => book.id === (+id));
  }
}
