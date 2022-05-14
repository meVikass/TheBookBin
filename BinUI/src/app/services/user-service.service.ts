import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: HttpClient) { }

  postUser(body:any){
    return this.http.post('http://localhost:3000/users/register',body,{
    observe:'body'
    })
  }

}
