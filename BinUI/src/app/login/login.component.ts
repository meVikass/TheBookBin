import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from '../services/global.service';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  @Output() newItemEvent = new EventEmitter<string>();
  @Output() userNameEvent = new EventEmitter<string>();
  userData: any;

  constructor(
    private userApiService: UserServiceService,
    private router: Router,
    private global: GlobalService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }

  isValid(field: string) {
    return (
      this.loginForm.get(field)?.invalid && this.loginForm.get(field)?.touched
    );
  }

  onLogin() {
    this.userApiService.loginUser(this.loginForm.value).subscribe(
      (data: any) => {
        this.userData = data;
        this.global.loggedInUser = this.userData;
        this.newItemEvent.emit('false');
        this.userNameEvent.emit(this.userData.userName);

        // localStorage.setItem('token', data.toString());
        console.log(this.userData);

        this.router.navigate(['/']);
      },
      (error) => {
        console.log('Error');
      }
    );
  }

  closeWindow(value: string) {
    this.newItemEvent.emit(value);
  }

  ngOnInit(): void {}
}
