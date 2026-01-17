import { Component, inject, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user.data';
import { form, FormField, maxLength, minLength, required, validate } from '@angular/forms/signals';
import { UserDataService } from '../shared/services/user-data.service';

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
    FormsModule,
    FormField,
  ],
  templateUrl: './dialog-add-user.html',
  styleUrl: './dialog-add-user.scss',
})
export class DialogAddUser {
  public userDataService = inject(UserDataService);

  public user = signal<User>({
    firstName: '',
    lastName: '',
    birthDate: 0,
    street: '',
    zipCode: '',
    city: '',
  });

  public birthDate: Date = new Date('1-1-1970');

  public userForm = form(this.user, (schemaPath) => {
    required(schemaPath.firstName, { message: 'First name is required' });
    required(schemaPath.lastName, { message: 'Last name is required' });
    required(schemaPath.birthDate, { message: 'Birth date is required' });
    required(schemaPath.street, { message: 'Street is required'  });
    required(schemaPath.zipCode, { message: 'Zip code is required'  });
    required(schemaPath.city, { message: 'City is required'  });
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
  });

  constructor() {}

  saveUser(): void {
    this.user().birthDate = this.birthDate.getTime();
    
    console.log('user', this.user());

    this.userDataService.saveUser(this.user());
  }
}
