import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css'],
})
export class RegisterUserComponent implements OnInit {
  userForm: FormGroup;
  @Output() newItemEvent = new EventEmitter<string>();

  constructor(private userApiService: UserServiceService) {
    this.userForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      userName: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      confirmPassword: new FormControl(null, [
        Validators.required,
        this.passwordValidator,
      ]),
    });

    this.userForm.controls['password'].valueChanges.subscribe((x) =>
      this.userForm?.controls['confirmPassword'].updateValueAndValidity()
    );
  }

  passwordValidator(control: AbstractControl) {
    if (control && (control.value != undefined || control.value != null)) {
      const confirmPasswordValue = control.value;
      const passwordControl = control.root.get('password');
      if (passwordControl) {
        const password = passwordControl.value;
        if (password != confirmPasswordValue || password === '') {
          return {
            isError: true,
          };
        }
      }
    }
    return null;
  }

  isValid(field: string) {
    return (
      this.userForm.get(field)?.invalid && this.userForm.get(field)?.touched
    );
  }

  successMessage: any;
  onRegister() {
    this.userApiService.postUser(this.userForm.value).subscribe(
      (data) => {
        this.successMessage = 'Success';
      },
      (error) => {
        this.successMessage = 'Error';
      }
    );
  }

  closeWindow(value: string) {
    this.newItemEvent.emit(value);
  }

  ngOnInit(): void {}
}