import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EbookService } from '../services/ebook.service';
import { GlobalService } from '../services/global.service';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css'],
})
export class FavoriteComponent implements OnInit {
  constructor(
    private global: GlobalService,
    private ebook: EbookService,
    private user: UserServiceService,
    private router: Router
  ) {}

  favoriteBooks = [
    { _id: String, imagePath: String, price: '', bookName: String },
  ];
  cartTotal: any;
  emptyCart = true;
  ngOnInit(): void {
    this.user.getUserDetails().subscribe(
      (data) => {
        this.global.loggedInUser = data;
        this.getBooks();
      },
      (err) => {
        this.router.navigate(['/']);
        console.log(err);
      }
    );
  }
  getBooks() {
    let total = 0;
    this.ebook.getFavoriteBooks(this.global.loggedInUser).subscribe(
      (data) => {
        this.favoriteBooks = [];
        this.favoriteBooks = data;

        for (let book of this.favoriteBooks) {
          total = total + parseInt(book.price);
        }
        this.cartTotal = total;
        if (this.favoriteBooks.length > 0) this.emptyCart = false;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  deleteFromFav(book: any) {
    let body = {
      userId: this.global.loggedInUser['userId'],
      bookId: book['_id'],
    };

    this.ebook.deleteFavBook(body).subscribe(
      (doc) => {
        this.getBooks();
      },
      (err) => {
        console.log('ER');
      }
    );
  }
  checkOut() {
    for (let book of this.favoriteBooks) {
      let body = {
        userId: this.global.loggedInUser['userId'],
        bookId: book._id,
      };
      this.ebook.checkOutOrder(body).subscribe(
        (data) => {
          for (let book of this.favoriteBooks) {
            this.deleteFromFav(book);
          }
          this.emptyCart = true;
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
}
