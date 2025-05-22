import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatSnackBarModule],
  providers: [],
})
export class LoginComponent implements OnInit {
  addForm!: FormGroup;
  private snackBar = inject(MatSnackBar);

  constructor(
    public _authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.addForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  save(): void {
    if (this.addForm.invalid) return;

    const body = this.addForm.value;

    console.log('COMPONENT TS: login = ', body);

    this._authService.login(body).subscribe({
      next: (response) => {
        const token = response.token;
        this._authService.saveSession(token);
        this.snackBar.open('Successfully Login!', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        this.router.navigate(['/Home']);
      },
      error: (err) => {
        const errorMessage =
          err?.error?.error || // API-specific error message
          err?.message || // Fallback message
          'Failed to Login. Please try again.';

        console.error('Login error:', err);

        this.snackBar.open(errorMessage, 'Close', {
          duration: 4000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      },
    });
  }
}
