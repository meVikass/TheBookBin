import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashComponent } from './admin-dash/admin-dash.component';
import { AppComponent } from './app.component';
import { BookDescriptionComponent } from './book-description/book-description.component';
import { DisplayDataComponent } from './display-data/display-data.component';
import { EbooksComponent } from './ebooks/ebooks.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { HomeComponent } from './home/home.component';
import { OrdersComponent } from './orders/orders.component';
import { RegisterBookComponent } from './register-book/register-book.component';
import { RegisterUserComponent } from './register-user/register-user.component';

const routes: Routes = [
  { path: 'ebooks', component: EbooksComponent },
  { path: '', component: HomeComponent },
  { path: 'favorite', component: FavoriteComponent },
  { path: 'des', component: BookDescriptionComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'admin-dashboard', component: AdminDashComponent },
  { path: 'display-data', component: DisplayDataComponent },
  { path: 'register-book', component: RegisterBookComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
