import { Component, inject, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogContent, MatDialogActions, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user.data';
import { disabled, form, FormField, maxLength, required, validate } from '@angular/forms/signals';
import { UserDataService } from '../shared/services/user-data.service';
import { MatProgressBar } from '@angular/material/progress-bar';

@Component({
  selector: 'app-dialog-add-user',
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatDialogContent,
    MatFormFieldModule,
    MatInputModule,
    MatButton,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressBar,
    FormsModule,
    FormField,
  ],
  templateUrl: './dialog-add-user.html',
  styleUrl: './dialog-add-user.scss',
})
export class DialogAddUser {
  public userDataService = inject(UserDataService);
  public dialogRef = inject(MatDialogRef<DialogAddUser>);

  // signal that is true, while firestore operation is in progress
  public loading = signal(false);

  // Anstatt einer Class die Junus vorschlägt,
  // benutze ich ein Signal für den anzulegenden User
  public user = signal<User>({
    firstName: '',
    lastName: '',
    birthDate: 0,
    street: '',
    zipCode: '',
    city: '',
  });

  public birthDate: Date = new Date('1-1-1970');

  // signal forms way to handle validation
  public userForm = form(this.user, (schemaPath) => {
    required(schemaPath.firstName, { message: 'First name is required' });
    required(schemaPath.lastName, { message: 'Last name is required' });
    required(schemaPath.birthDate, { message: 'Birth date is required' });
    required(schemaPath.street, { message: 'Street is required' });
    required(schemaPath.zipCode, { message: 'Zip code is required' });
    required(schemaPath.city, { message: 'City is required' });
    maxLength(schemaPath.zipCode, 5, { message: 'Zip code must be five numbers' });
    validate(schemaPath.zipCode, ({ value }) => {
      if (!/^([0-9]{5,})$/.test(value())) {
        return {
          kind: 'zipDE',
          message: 'Zip code must be five numbers',
        };
      }

      return null;
    });
    disabled(schemaPath, () => this.loading());
  });

  constructor() {}

  // wandelt birthDate in eine number um
  // und speichert den neuen User über den Service in Firestore
  async saveUser(): Promise<void> {
    this.loading.set(true);
    this.user().birthDate = this.birthDate.getTime();
    
    console.log('user', this.user());
    
    await this.userDataService.addUser(this.user());
    this.loading.set(false);
    this.dialogRef.close();
  }
}
