import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DialogAddUser } from '../dialog-add-user/dialog-add-user';

@Component({
  selector: 'app-user',
  imports: [MatIcon, MatButtonModule, MatTooltipModule, MatDialogModule],
  templateUrl: './user.html',
  styleUrl: './user.scss',
})
export class User {
  public dialog = inject(MatDialog)
 

  openDialog() {
    this.dialog.open(DialogAddUser)
  }
}
