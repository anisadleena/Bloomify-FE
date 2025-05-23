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
  selector: 'signup',
  templateUrl: 'signup.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatSnackBarModule],
  providers: [],
})
export class SignUpComponent implements OnInit {
  addForm!: FormGroup;
  private snackBar = inject(MatSnackBar);

  constructor(
    public _authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.addForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  save(): void {
    if (this.addForm.invalid) return;

    const body = this.addForm.value;
    this._authService.signup(body).subscribe({
      next: (response) => {
        const token = response.token;
        this._authService.saveSession(token);
        this.snackBar.open('Successfully Signup!', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        this.router.navigate(['/login']);
      },
      error: (err) => {
        const errorMessage =
          err?.error?.error || // API-specific error message
          err?.message || // Fallback message
          'Failed to Signup. Please try again.';

        console.error('Signup error:', err);

        this.snackBar.open(errorMessage, 'Close', {
          duration: 4000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      },
    });
  }
}
