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

  postBookToFav(body: any) {
    return this.http.post('http://localhost:3000/favorite-books/add', body, {
      observe: 'body',
    });
  }

  getFavoriteBooks(user: any) {
    let userId = user['_id'];
    let body = { userID: userId };

    return this.http.get<any>(
      'http://localhost:3000/favorite-books/all/' + userId
    );
  }
}
