import { Component, OnInit } from '@angular/core';
import { EbookService } from '../services/ebook.service';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css'],
})
export class FavoriteComponent implements OnInit {
  constructor(private global: GlobalService, private ebook: EbookService) {}

  favoriteBooks = [{ imagePath: '', price: '', bookName: '' }];
  ngOnInit(): void {
    this.ebook.getFavoriteBooks(this.global.loggedInUser).subscribe(
      (data) => {
        this.favoriteBooks = [];
        this.favoriteBooks = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
