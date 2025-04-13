import { Component } from '@angular/core';
import {FormGroup, FormControl, Validators, ReactiveFormsModule, FormBuilder} from '@angular/forms';
import {MatError, MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatCard, MatCardTitle} from '@angular/material/card';
import {NgIf} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [
    ReactiveFormsModule,
    MatLabel,
    MatError,
    MatCard,
    NgIf,
    MatInput,
    MatFormField,
    MatButton,
    MatCardTitle,
    MatProgressSpinnerModule,

  ],
  styleUrls: ['./login.component.scss']
})
export class LoginComponent{
  loginForm: FormGroup;
  isLoading = false;
  error: string | null = null;
  showLoginForm = true

  constructor(private fb: FormBuilder) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  login() {
    this.error = '';

    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    if (email === 'test@gmail.com' && password === 'test') {
      this.isLoading = true;
      this.showLoginForm = false;

      localStorage.setItem('isLoggedIn', 'true');

      setTimeout(() => {
        window.location.href = '/home';
      }, 2);
    } else {
      this.error = 'Hibás email vagy jelszó!';
    }
  }
}
