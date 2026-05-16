import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-auth-info-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './auth-info-dialog.html',
  styleUrls: ['./auth-info-dialog.css']
})
export class AuthInfoDialog {
  constructor(private dialogRef: MatDialogRef<AuthInfoDialog>) {}

  close() {
    this.dialogRef.close();
  }
}
