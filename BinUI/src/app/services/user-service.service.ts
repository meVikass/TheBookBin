import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  constructor(private http: HttpClient) {}

  postUser(body: any) {
    return this.http.post('http://localhost:3000/users/register', body, {
      observe: 'body',
    });
  }

  loginUser(body: any) {
    return this.http.post('http://localhost:3000/users/login', body, {
      observe: 'body',
    });
  }

  getUserDetails() {
    let token = localStorage.getItem('token') || '';
    return this.http.get('http://localhost:3000/users/user-details', {
      observe: 'body',
      params: new HttpParams().append('token', token),
    });
  }
}
