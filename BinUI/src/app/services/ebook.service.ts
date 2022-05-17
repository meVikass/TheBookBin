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
}
