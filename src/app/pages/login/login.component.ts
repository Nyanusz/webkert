import {Component, OnDestroy} from '@angular/core';
import {FormGroup, FormControl, Validators, ReactiveFormsModule, FormBuilder} from '@angular/forms';
import {MatError, MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatCard, MatCardTitle} from '@angular/material/card';
import {NgIf} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {Subscription} from 'rxjs';
import {AuthService} from '../../shared/services/auth-guard.service';
import {Router} from '@angular/router';

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
export class LoginComponent implements OnDestroy{
  loginForm: FormGroup;
  isLoading = false;
  error: string | null = null;
  showLoginForm = true
  authSubscription?: Subscription

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  login() {
    if(this.loginForm.get('email')?.invalid){
      this.error = 'Létező email adj meg!'
      return
    }
    if (this.loginForm.get('password')?.invalid){
      this.error = 'A jelszónak 6 karakternek kell lennie'
      return;
    }

    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    this.isLoading = true
    this.showLoginForm = false;
    this.error = '';

    this.authService.login(email,password)
      .then(userCredential => {
        console.log('Bejelentkezés sikeres:', userCredential.user)
        this.authService.updateLoginStatus(true)
        this.router.navigateByUrl('/home')
      }).catch(error => {
        console.error('Bejelentkezési hiba:', error)
        this.isLoading = false
        this.showLoginForm = true

      switch (error.code) {
        case 'auth/user-not-found':
          this.error = 'Nincs ilyen felhasználó az adatbázisban'
          break
        case 'auth/wrong-password':
          this.error = 'Rossz jelszó'
          break
        case 'auth/invalid-credential':
          this.error = 'Rossz email-cím vagy jelszó'
          break
        default:
          this.error = 'Hitelesítés sikertelen volt, kérlek próbáld újra!'
        }
    } )

  }


  ngOnDestroy() {
    this.authSubscription?.unsubscribe();
  }
}
