import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from './services/global.service';
import { UserServiceService } from './services/user-service.service';

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
  userName: any;
  isUserAdmin = false;
  loggedInUser: any;
  openLogOutWindow = false;
  registrationSuccess = false;
  constructor(
    private global: GlobalService,
    private users: UserServiceService,
    private router: Router
  ) {
    console.log('app constructer called');

    this.users.getUserDetails().subscribe(
      (data) => {
        this.isUserLoggedIn = true;
        this.loggedInUser = data;
        if (this.loggedInUser.isAdmin === true) this.isUserAdmin = true;
        this.setUserDetails();
      },
      (err) => {
        console.log('ERR');
      }
    );
  }

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
    } else if (newItem === 'success') {
      this.registrationSuccess = true;
      this.openRegistrationWindow = 'close';
      setTimeout(() => {
        this.registrationSuccess = false;
      }, 1500);
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

  setUserDetails() {
    this.isUserLoggedIn = true;
    this.userName = this.loggedInUser.userName;
    this.global.loggedInUser = this.loggedInUser;
  }
  showLogOutWindow() {
    if (this.openLogOutWindow === false) this.openLogOutWindow = true;
    else this.openLogOutWindow = false;
  }

  onLogOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
    window.location.reload();
  }
}
