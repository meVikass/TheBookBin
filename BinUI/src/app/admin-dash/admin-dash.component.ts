import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EbookService } from '../services/ebook.service';
import { GlobalService } from '../services/global.service';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-admin-dash',
  templateUrl: './admin-dash.component.html',
  styleUrls: ['./admin-dash.component.css'],
})
export class AdminDashComponent implements OnInit {
  allBooks: any;
  booksForPreview: any;
  allUsers: any;
  usersForPreview: any;
  collectionPreview: any;
  constructor(
    private ebook: EbookService,
    private users: UserServiceService,
    private global: GlobalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.users.getUserDetails().subscribe(
      (data) => {
        this.global.loggedInUser = data;
        if (this.global.loggedInUser.isAdmin === false) {
          this.router.navigate(['/']);
        } else {
          this.getAllBooks();
          this.getAllUsers();
        }
      },
      (err) => {
        this.router.navigate(['/']);
        console.log(err);
      }
    );
  }

  getAllBooks() {
    this.ebook.getAllBooks().subscribe(
      (data) => {
        this.allBooks = data;

        this.booksForPreview = this.allBooks.slice(0, 6);
        this.collectionPreview = this.sliceData(this.allBooks, 4);
      },
      (err) => {
        console.log('error');
      }
    );
  }

  getAllUsers() {
    this.users.getallUsers().subscribe(
      (data) => {
        this.allUsers = data;
        this.usersForPreview = this.sliceData(this.allUsers, 4);
      },
      (err) => {
        console.log('error');
      }
    );
  }
  sliceData(data: any, count: any) {
    data = data.reverse();
    data = data.slice(0, count);
    return data;
  }

  onSeeAll(choice: any) {
    if (choice === 'customers') {
      this.global.choice = 'customers';
      this.global.seeAll = this.allUsers;
    } else if (choice === 'books') {
      this.global.choice = 'books';
      this.global.seeAll = this.allBooks.reverse();
    } else {
      this.global.choice = 'recentbooks';
      this.global.seeAll = this.allBooks;
    }

    this.router.navigate(['/display-data']);
  }
}
