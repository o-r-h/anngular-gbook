import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { BookDetailComponent } from './book-detail/book-detail.component';

export const routes: Routes = [
  {
    path: '', redirectTo: '/app-landing-page', pathMatch: 'full'
  },
  {path: 'app-landing-page', component: LandingPageComponent},
  {path: 'app-book-detail/:isbn', component: BookDetailComponent}
];
