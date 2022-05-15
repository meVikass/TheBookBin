import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { EbooksComponent } from './ebooks/ebooks.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'ebooks', component: EbooksComponent },
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
