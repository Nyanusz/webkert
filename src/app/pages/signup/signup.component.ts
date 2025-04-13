import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { User } from '../../shared/models/User';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    RouterLink
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signUpForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    rePassword: new FormControl('', [Validators.required]),
    name: new FormGroup({
      firstname: new FormControl('', [Validators.required, Validators.minLength(2)]),
      lastname: new FormControl('', [Validators.required, Validators.minLength(2)])
    })
  }, { validators: this.passwordMatchValidator() });

  isLoading = false;
  showForm = true;
  signupError = '';

  constructor(private router: Router) {}


  passwordMatchValidator(): ValidatorFn {
    return (form: AbstractControl): { [key: string]: any } | null => {
      const password = form.get('password')?.value;
      const rePassword = form.get('rePassword')?.value;
      return password && rePassword && password !== rePassword
        ? { passwordMismatch: true }
        : null;
    };
  }

  signup(): void {
    this.signupError = '';

    if (this.signUpForm.invalid) {
      this.signupError = 'Kérlek javítsd az adataidat, mielőtt regisztrálsz.';
      return;
    }

    this.isLoading = true;
    this.showForm = false;

    const newUser: User = {
      name: {
        firstname: this.signUpForm.value.name?.firstname || '',
        lastname: this.signUpForm.value.name?.lastname || ''
      },
      email: this.signUpForm.value.email || '',
      password: this.signUpForm.value.password || '',
      zenek: []
    };

    console.log('New user:', newUser);
    console.log('Form value:', this.signUpForm.value);


    // Szimulált szerverhívás
    setTimeout(() => {
      this.isLoading = true;
      this.showForm = false;
      this.router.navigateByUrl('/login'); // Sikeres regisztráció után átirányítás

    }, 2);
  }
}
