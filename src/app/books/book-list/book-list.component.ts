import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { BookService } from '../shared/book.service';
import { Book } from '../shared/book';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books: Book[];
  currentPage: number;
  totalPages: number[];

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService
  ) { }

  ngOnInit() {
   this.subscribeToPage();
  }

  private subscribeToPage() {
    this.route.queryParams.subscribe(
      params => this.loadPage(params['page'])  //params['page'] ตือการเรียก query string จาก URL เช่น /books?page=1
    )
  }

  private loadPage(page = 1) {
    const {books, currentPage, totalPages } = this.bookService.getBooks(page);

    this.books = books;
    this.currentPage = currentPage;
    this.totalPages 
      = Array.from({ length: totalPages}, (_, index) => index + 1);
  }
}
