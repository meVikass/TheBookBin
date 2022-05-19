import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-book-description',
  templateUrl: './book-description.component.html',
  styleUrls: ['./book-description.component.css'],
})
export class BookDescriptionComponent implements OnInit {
  selectedBook: any;
  selectedRating = 0;

  constructor(private global: GlobalService) {}

  ngOnInit(): void {
    this.selectedBook = this.global.selectedBookForDes;
  }
  onUserRating(rate: number) {
    this.selectedRating = rate;
  }

  onSubmit(comment: any) {}
}
