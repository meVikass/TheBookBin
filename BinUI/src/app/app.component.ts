import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'BinUI';
  openRegistrationWindow = 'false';
  openLoginWindow = 'false';
  isUserLoggedIn = false;
  userName = '';
  isUserAdmin = false;

  onRegisterNow() {
    this.openRegistrationWindow = 'true';
  }
  onLogin() {
    this.openLoginWindow = 'true';
  }
  ngOnInit(): void {}

  showOrHideWindow(newItem: string) {
    if (newItem === 'login') {
      this.openRegistrationWindow = 'close';
      this.openLoginWindow = 'true';
    } else if (newItem === 'register') {
      this.openLoginWindow = 'close';
      this.openRegistrationWindow = 'true';
    } else {
      this.openRegistrationWindow = 'close';
      this.openLoginWindow = 'close';
    }
  }

  setUserName(name: string) {
    this.isUserLoggedIn = true;
    this.userName = name;
  }
}
