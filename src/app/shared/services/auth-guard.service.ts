import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  signOut,
  authState,
  User as FirebaseUser,
  UserCredential, onAuthStateChanged, createUserWithEmailAndPassword,
} from '@angular/fire/auth';
import { Observable } from 'rxjs';
import {Router} from '@angular/router';
import {collection, doc, Firestore, setDoc} from '@angular/fire/firestore';
import { User } from '../models/User';
@Injectable({ providedIn: 'root' })
export class AuthService {
  currentUser: Observable<FirebaseUser | null>
  constructor(private auth: Auth,
              private firestore: Firestore,
              private router: Router) {
    this.currentUser = authState(this.auth)
  }

  login(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout(): Promise<void> {
    localStorage.setItem('isLoggedIn', 'false')
    return signOut(this.auth).then(() => {
      this.router.navigateByUrl('/home');
    });
  }

  getUser(): Observable<FirebaseUser | null> {
    return new Observable(observer => {
      const unsubscribe = onAuthStateChanged(this.auth, user => {
        observer.next(user);
      });
      return { unsubscribe };
    });
  }

  async signUp(email: string, password: string, userData: Partial<User>): Promise<UserCredential> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );

      await this.createUserData(userCredential.user.uid, {
        ...userData,
        id: userCredential.user.uid,
        email: email,
        zenek: [],
      });

      return userCredential;
    } catch (error) {
      console.error('Hiba a regisztráció során:', error);
      throw error;
    }
  }

  private async createUserData(userId: string, userData: Partial<User>): Promise<void> {
    const userRef = doc(collection(this.firestore, 'User'), userId);

    return setDoc(userRef, userData);
  }

  isLoggedIn(): Observable<FirebaseUser | null > {
    return this.currentUser;
  }

  updateLoginStatus(isLoggedIn: boolean): void {
    localStorage.setItem('isLoggedIn', isLoggedIn ? 'true' : 'false')
  }
}
