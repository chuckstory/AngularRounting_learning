import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { BookService } from '../../shared/book.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  content: string;
  constructor(
    private route: ActivatedRoute,
    private bookService: BookService
  ) { }

  ngOnInit() {
    const { id } = this.route.parent.snapshot.params;
    this.content = this.bookService.getContent(id);
  }

}
