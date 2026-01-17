import { inject, Injectable, Injector, runInInjectionContext, signal } from '@angular/core';
import { addDoc, collection, collectionData, Firestore } from '@angular/fire/firestore';
import { User } from '../../../models/user.data';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  private firestore = inject(Firestore);
  private injector = inject(Injector);

  // users$!: Observable<User[]>;

  // connectUserDataStream(): void {
  //   this.users$ = collectionData(this.getUserRef());
  // }

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
