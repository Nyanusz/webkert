import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({
    eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(
      () => initializeApp({
        projectId: "musicshare-73fc484c",
        appId: "1:14218171752:web:4784d392a7edd9b8a472dd",
        storageBucket: "musicshare-73fc484c.firebasestorage.app",
        apiKey: "AIzaSyApjSDzgIWOHpJHjCM9a4kbmnKIA2LCsOY",
        authDomain: "musicshare-73fc484c.firebaseapp.com",
        messagingSenderId: "14218171752" })),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())]
};
