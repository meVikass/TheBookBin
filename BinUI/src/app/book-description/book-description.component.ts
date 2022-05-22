import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EbookService } from '../services/ebook.service';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-book-description',
  templateUrl: './book-description.component.html',
  styleUrls: ['./book-description.component.css'],
})
export class BookDescriptionComponent implements OnInit {
  selectedBook: any;
  selectedRating = 0;
  selectedBookComments = [];

  constructor(
    private global: GlobalService,
    private ebook: EbookService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.selectedBook = this.global.selectedBookForDes;
    this.selectedBookComments = this.selectedBook['comments'];
  }
  onUserRating(rate: number) {
    this.selectedRating = rate;
  }

  onSubmit(comment: any) {
    let body = {
      rating: this.selectedRating,
      comments: [
        {
          userId: this.global.loggedInUser['_id'],
          userName: this.global.loggedInUser['userName'],
          comment: comment.value,
        },
      ],
    };

    for (let obj of this.selectedBook.comments) {
      body.comments.push(obj);
    }
    this.ebook.patchComment(this.selectedBook['_id'], body).subscribe(
      (doc) => {
        this.showComments();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  showComments() {
    this.ebook.getBookById(this.global.selectedBookForDes['_id']).subscribe(
      (doc) => {
        this.selectedBookComments = doc['comments'];
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
