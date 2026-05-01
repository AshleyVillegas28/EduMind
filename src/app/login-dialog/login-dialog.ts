import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { Auth } from '../services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-dialog',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login-dialog.html',
  styleUrl: './login-dialog.css',
})
export class LoginDialog {
  username = '';
  password = '';
  errorMessage = '';
  isLoading = false;

  constructor(
    private authService: Auth,
    private router: Router,
    public dialogRef: MatDialogRef<LoginDialog>
  ) {}

  onSubmit() {
    this.isLoading = true;
    this.errorMessage = '';

    setTimeout(() => {
      if (this.authService.login(this.username, this.password)) {
        this.dialogRef.close(true);
        this.router.navigate(['/pagina-principal']);
      } else {
        this.errorMessage = 'Error: Usuario o contraseña incorrectos';
      }
      this.isLoading = false;
    }, 1000);
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
