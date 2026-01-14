import { Component } from '@angular/core';
import { MatDialogContent, MatDialogActions } from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-add-user',
  imports: [MatDialogContent, MatDialogActions, MatDialogContent],
  templateUrl: './dialog-add-user.html',
  styleUrl: './dialog-add-user.scss',
})
export class DialogAddUser {

}
