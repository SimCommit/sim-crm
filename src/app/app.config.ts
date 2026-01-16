import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideNativeDateAdapter } from '@angular/material/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideNativeDateAdapter(),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'sim-crm-caa9a',
        appId: '1:724678862277:web:a9857f0c53aa45a86e17ac',
        storageBucket: 'sim-crm-caa9a.firebasestorage.app',
        apiKey: 'AIzaSyBBw9iseaS4CcP6wS06VBW2Rvt3xKRYTxY',
        authDomain: 'sim-crm-caa9a.firebaseapp.com',
        messagingSenderId: '724678862277',
      }),
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
};
