import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { BooksComponent } from './books/books.component';
import { BookService } from './books/shared/book.service';
import { AuthService } from './shared/auth.service';
import { FlashMessageService } from './flash-message/shared/flash-message.service';
import { BookListComponent } from './books/book-list/book-list.component';
import { FormComponent } from './books/form/form.component';
import { BookComponent } from './books/book/book.component';
import { FlashMessageComponent } from './flash-message/flash-message.component';
import { ContentComponent } from './books/book/content/content.component';
import { ReviewsComponent } from './books/book/reviews/reviews.component';

const appRoutes: Routes = [
  {
    path: 'books',
    component: BooksComponent,
    children: [
      {
        path: '',
        component: BookListComponent
      },
      {
        path: 'new',
        component: FormComponent,
        data: { formType: 'NEW'}
      },
      {
        path: ':id/edit',
        component: FormComponent,
        data: { formType: 'EDIT'}
      },
      {
        path: ':id',
        component: BookComponent,
        children: [
          {
            path: '',
            redirectTo:'content',
            pathMatch: 'full'
          },
          {
            path: 'content',
            component: ContentComponent
          },
          {
            path: 'reviews',
            component: ReviewsComponent 
          }
        ]
      }
    ]
  },
  {
    path: '',
    redirectTo: '/books',
    pathMatch: 'full'
  }
]

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    BookListComponent,
    FormComponent,
    BookComponent,
    FlashMessageComponent,
    ContentComponent,
    ReviewsComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    BookService,
    FlashMessageService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
