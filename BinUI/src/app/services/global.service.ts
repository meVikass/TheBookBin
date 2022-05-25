import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  constructor() {}
  loggedInUser: any;
  selectedBookForDes: any;
  darkmode = true;
  seeAll: any;
  choice: any;
}
