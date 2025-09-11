import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


export function passwordMatchValidator(controlName: string, matchingControlName: string): ValidatorFn {
  return (formGroup: AbstractControl) => {
    const control = formGroup.get(controlName);
    const matchingControl = formGroup.get(matchingControlName);

    if (!control || !matchingControl) return null;

    if (matchingControl.errors && !matchingControl.errors['mismatch']) return null;

    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mismatch: true });
    } else {
      matchingControl.setErrors(null);
    }

    return null;
  };
}


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.html',
})
export class RegisterComponent {
  registerForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(4)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(10)]],
        confirmPassword: ['', [Validators.required]],
        agree: [false, Validators.requiredTrue],
      },
      { validators: passwordMatchValidator('password', 'confirmPassword') }
    );
  }

  // get f() {
  //   return this.registerForm.controls;
  // }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const { username, email, password } = this.registerForm.value;

    this.authService.register({ username, email, password }).subscribe({
      next: (res) => {
        console.log('✅ User Registered:', res);
        const user = JSON.stringify(res.data);
        localStorage.setItem('user', user);
        alert('Registration successful!');
        this.router.navigate(['/products']);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('❌ Error:', err);
        this.errorMessage = err.error?.message || 'Something went wrong';
        this.isLoading = false;
      },
    });
  }
}
