import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EbookService } from '../services/ebook.service';

@Component({
  selector: 'app-register-book',
  templateUrl: './register-book.component.html',
  styleUrls: ['./register-book.component.css'],
})
export class RegisterBookComponent implements OnInit {
  bookForm: FormGroup;
  image = '';
  constructor(private ebook: EbookService, private router: Router) {
    this.bookForm = new FormGroup({
      bookName: new FormControl(null, Validators.required),
      authorName: new FormControl(null, Validators.required),
      imagePath: new FormControl(null, Validators.required),
      generes: new FormControl(null, Validators.required),
      year: new FormControl(null),
      pageCount: new FormControl(null),
      price: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {}

  isValid(field: string) {
    return (
      this.bookForm.get(field)?.invalid && this.bookForm.get(field)?.touched
    );
  }
  onSubmit() {
    if (this.bookForm.valid) {
      this.ebook.postANewBook(this.bookForm.value).subscribe(
        (data) => {
          alert('Book posted successfully !');
          this.router.navigate(['/admin-dashboard']);
          this;
        },
        (err) => {
          console.log('err');
        }
      );
    } else {
      alert('Form is not valid. Please check the fields');
    }
  }
}
