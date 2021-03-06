import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EbookService {
  constructor(private http: HttpClient) {}

  getAllBooks() {
    return this.http.get<any>('http://localhost:3000/books/all');
  }

  postANewBook(body: any) {
    return this.http.post('http://localhost:3000/books/new-book', body, {
      observe: 'body',
    });
  }
  postBookToFav(body: any) {
    return this.http.post('http://localhost:3000/favorite-books/add', body, {
      observe: 'body',
    });
  }

  getFavoriteBooks(user: any) {
    let userId = user['userId'];
    let body = { userID: userId };

    return this.http.get<any>(
      'http://localhost:3000/favorite-books/all/' + userId
    );
  }

  getBookById(bookId: any) {
    return this.http.get<any>('http://localhost:3000/books/' + bookId);
  }

  patchComment(bookId: any, body: any) {
    return this.http.patch('http://localhost:3000/books/' + bookId, body, {
      observe: 'body',
    });
  }

  deleteFavBook(body: any) {
    return this.http.post('http://localhost:3000/favorite-books/delete', body, {
      observe: 'body',
    });
  }

  checkOutOrder(body: any) {
    return this.http.post('http://localhost:3000/order/add', body, {
      observe: 'body',
    });
  }

  getOrderDetails(userId: any) {
    let body = { userID: userId };
    return this.http.get<any>('http://localhost:3000/order/all/' + userId);
  }
}
