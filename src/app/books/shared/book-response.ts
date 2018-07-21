import { Book } from './book';

export interface BookResponse {
    books: Book[];
    currentPage: number;
    totalPages: number;
}
