import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { UserServiceService } from './services/user-service.service';
import { LoginComponent } from './login/login.component';
import { EbooksComponent } from './ebooks/ebooks.component';
import { HomeComponent } from './home/home.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { BookDescriptionComponent } from './book-description/book-description.component';
import { OrdersComponent } from './orders/orders.component';
import { AdminDashComponent } from './admin-dash/admin-dash.component';
import { DisplayDataComponent } from './display-data/display-data.component';
import { RegisterBookComponent } from './register-book/register-book.component';

@NgModule({
  declarations: [AppComponent, RegisterUserComponent, LoginComponent, EbooksComponent, HomeComponent, FavoriteComponent, BookDescriptionComponent, OrdersComponent, AdminDashComponent, DisplayDataComponent, RegisterBookComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [UserServiceService],
  bootstrap: [AppComponent],
})
export class AppModule {}
