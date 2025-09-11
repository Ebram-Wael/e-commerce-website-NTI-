import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(10)]],
    });
  }
  errorMessage = '';
  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.authService.login( this.loginForm.value).subscribe({
        next: (res) => {
          console.log('Login success ✅', res);

          if (res.token) {
            localStorage.setItem('token', res.token);
            localStorage.setItem('refreshToken', res.refreshToken);
            this.router.navigate(['/products']);
            this.isLoading = false;
          }
        },
        error: (err) => {
          console.error('Login error ❌', err);
          this.errorMessage = 'Invalid email or password';
          this.isLoading = false;
        },
      });
    }
  }
}
