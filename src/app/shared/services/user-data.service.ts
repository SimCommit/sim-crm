import { inject, Injectable, Injector, runInInjectionContext, signal } from '@angular/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { User } from '../../../models/user.data';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  private firestore = inject(Firestore);
  private injector = inject(Injector);

  // await und async vor allen relevanten Funktionsteilen
  async addUser(user: User): Promise<void> {
    await runInInjectionContext(this.injector, async () => {
      await addDoc(this.getUserRef(), user);
    });
  }

  getUserRef() {
    return collection(this.firestore, 'users');
  }
}
