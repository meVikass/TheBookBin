import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'BinUI';
  openRegistrationWindow = false;
  openLoginWindow = false;

  onRegisterNow() {
    this.openRegistrationWindow = true;
  }
  onLogin() {
    this.openLoginWindow = true;
  }
  ngOnInit(): void {}

  addItem(newItem: string) {
    this.openRegistrationWindow = false;
  }
}
