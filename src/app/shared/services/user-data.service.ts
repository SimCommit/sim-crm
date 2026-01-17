import { inject, Injectable, Injector, runInInjectionContext } from '@angular/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { User } from '../../../models/user.data';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  private firestore = inject(Firestore);
  private injector = inject(Injector);

  saveUser(user: User) {
    runInInjectionContext(this.injector, () => {
      addDoc(this.getUserRef(), user);
    });
    console.log('Finished adding user');
  }

  getUserRef() {
    return collection(this.firestore, 'users');
  }
}
