import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'Home', component: HomeComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
