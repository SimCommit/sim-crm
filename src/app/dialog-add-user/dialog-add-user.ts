import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user.data';

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
  ],
  templateUrl: './dialog-add-user.html',
  styleUrl: './dialog-add-user.scss',
})
export class DialogAddUser {
  public user: User = {
    firstName: '',
    lastName: '',
    birthDate: 0,
    street: '',
    zipCode: 0,
    city: '',
  };

  public birthDate: Date = new Date("1-1-1970");

  constructor() {}

  public saveUser(): void {
    this.user.birthDate = this.birthDate.getTime();
    console.log('user', this.user);
  }
}
