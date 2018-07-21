import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../shared/book';
import { BookService } from '../shared/book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  book: Book;

  constructor(
    private router: Router,
    private route:ActivatedRoute,
    private bookService: BookService
  ) { }

  ngOnInit() {
    this.subscribeToId();
  }

  onPrev() {
    this.router.navigate(['/books', this.book.prevId]);
  }

  onNext() {
    this.router.navigate(['/books', this.book.nextId]);
  }


  private subscribeToId() {
    this.route.params.subscribe(
      params => this.book = this.bookService.getBook(+params['id'])
    );

    // const { id } = this.route.snapshot.params;
    // this.book = this.bookService.getBook(+id); 
  }

}
