import { Component, OnInit } from '@angular/core';
import { EbookService } from '../services/ebook.service';

@Component({
  selector: 'app-ebooks',
  templateUrl: './ebooks.component.html',
  styleUrls: ['./ebooks.component.css'],
})
export class EbooksComponent implements OnInit {
  ebooks = [];
  genres = [];

  constructor(private ebook: EbookService) {}

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
    console.log(this.genres);
  }
}
