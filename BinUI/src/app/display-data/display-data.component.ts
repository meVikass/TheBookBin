import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-display-data',
  templateUrl: './display-data.component.html',
  styleUrls: ['./display-data.component.css'],
})
export class DisplayDataComponent implements OnInit {
  constructor(private global: GlobalService) {}
  data: any;
  choice: any;
  ngOnInit(): void {
    this.choice = this.global.choice;
    this.data = this.global.seeAll;
    console.log(this.data);
  }
}
