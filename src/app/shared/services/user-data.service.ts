import { inject, Injectable, Injector, runInInjectionContext, signal } from '@angular/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { User } from '../../../models/user.data';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  private firestore = inject(Firestore);
  private injector = inject(Injector);

  public loading = signal(false);

  // anstat async mit finally (tritt auch im error fall ein) "awaited"
  saveUser(user: User): void {
    this.loading.set(true);
    runInInjectionContext(this.injector, () => {
      addDoc(this.getUserRef(), user).finally( () => this.loading.set(false));
    });
  }

  getUserRef() {
    return collection(this.firestore, 'users');
  }
}
