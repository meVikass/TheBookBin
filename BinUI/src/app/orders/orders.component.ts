import { Component, OnInit } from '@angular/core';
import { EbookService } from '../services/ebook.service';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  constructor(private eboook: EbookService, private global: GlobalService) {}
  bookData:any;

  ngOnInit(): void {
    this.eboook.getOrderDetails(this.global.loggedInUser.userId).subscribe(
      (data) => {
        this.bookData = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
