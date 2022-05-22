import { Component, OnInit } from '@angular/core';
import { EbookService } from '../services/ebook.service';
import { LoginComponent } from '../login/login.component';
import { GlobalService } from '../services/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ebooks',
  templateUrl: './ebooks.component.html',
  styleUrls: ['./ebooks.component.css'],
})
export class EbooksComponent implements OnInit {
  ebooks = [];
  genres = [];
  selectedGenres = [];
  activeGenres = 'Horror';
  selectedEbooks = [{ imagePath: '', bookName: '', authorName: '', price: '' }];

  constructor(
    private ebook: EbookService,
    private global: GlobalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.ebook.getAllBooks().subscribe(
      (data) => {
        this.ebooks = data;
        this.setGenres();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  setGenres() {
    let genres: never[] = [];
    for (let obj of this.ebooks) {
      genres.push(obj['genres']);
    }
    this.genres = [...new Set(genres.map((item) => item))];
    this.showBooksByGenres('Romance');
  }

  showBooksByGenres(genres: string) {
    this.selectedEbooks = [];
    this.activeGenres = genres;
    for (let obj of this.ebooks) {
      if (obj['genres'] === genres) {
        this.selectedEbooks.push(obj);
      }
    }
  }

  onAddToCart(bookObj: any) {
    let body = {
      userId: this.global.loggedInUser['userId'],
      bookId: bookObj['_id'],
    };

    this.ebook.postBookToFav(body).subscribe(
      (data) => {
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  showBookDetails(book: any) {
    this.global.selectedBookForDes = book;
    this.router.navigate(['/des']);
  }
}
