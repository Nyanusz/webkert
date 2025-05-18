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
import {AuthService} from '../../shared/services/auth-guard.service';

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

  constructor(private router: Router,
  private authService: AuthService) {}


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

    const password = this.signUpForm.get('password')?.value;
    const rePassword = this.signUpForm.get('rePassword')?.value;


    if (password !== rePassword) {
      this.signupError = 'The passwords do not match.';
      return;
    }

    this.isLoading = true;
    this.showForm = false;

    const userData: Partial<User> = {
      name: {
        firstname: this.signUpForm.value.name?.firstname || '',
        lastname: this.signUpForm.value.name?.lastname || ''
      },
      email: this.signUpForm.value.email || '',
      zenek: []
    };

    console.log('New user:', userData);
    console.log('Form value:', this.signUpForm.value);


    const email = this.signUpForm.value.email || ''
    const pw = this.signUpForm.value.password || ''

    this.authService.signUp(email, pw , userData)
      .then(userCredential => {
        console.log('Regisztráció sikeres!', userCredential.user);
        this.authService.updateLoginStatus(true)
        this.router.navigateByUrl('/home')
      })
      .catch(error => {
        console.error('Regisztrációs hiba: ', error)
        this.isLoading = false
        this.showForm = true
        switch (error.code) {
          case 'auth/user-not-found':
            this.signupError = 'Nincs ilyen felhasználó az adatbázisban'
            break
          case 'auth/wrong-password':
            this.signupError = 'Rossz jelszó'
            break
          case 'auth/invalid-credential':
            this.signupError = 'Rossz email-cím vagy jelszó'
            break
          default:
            this.signupError = 'Hitelesítés sikertelen volt, kérlek próbáld újra!'
        }
      })

    // Szimulált szerverhívás
    setTimeout(() => {
      this.isLoading = true;
      this.showForm = false;
      this.router.navigateByUrl('/login'); // Sikeres regisztráció után átirányítás

    }, 2);
  }
}
