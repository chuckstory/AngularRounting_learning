import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { BookService } from '../../shared/book.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
  reviews: string[];
  constructor(
    private route: ActivatedRoute,
    private bookService: BookService
  ) { }

  ngOnInit() {
    const { id } = this.route.parent.snapshot.params;
    this.reviews = this.bookService.getReview(id);
  }

}
