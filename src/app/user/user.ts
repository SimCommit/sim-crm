import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DialogAddUser } from '../dialog-add-user/dialog-add-user';
import { UserObj } from '../../models/user.class';

@Component({
  selector: 'app-user',
  imports: [MatIcon, MatButtonModule, MatTooltipModule, MatDialogModule],
  templateUrl: './user.html',
  styleUrl: './user.scss',
})
export class User {
  public dialog = inject(MatDialog)

  public user = new UserObj();
  
  // public birthDate: Date; 

  openDialog() {
    this.dialog.open(DialogAddUser)
  }
}
