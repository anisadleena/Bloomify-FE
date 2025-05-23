import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/signup/signup.component';
import { ForgotPasswordComponent } from './auth/forgotpassword/forgotpassword.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'Home', component: HomeComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
