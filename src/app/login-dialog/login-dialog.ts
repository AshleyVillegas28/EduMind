import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { AuthService } from '../RegistroModuloC/services/auth.service';
import { RegistroDialog } from '../RegistroModuloC/components/registro-dialog/registro-dialog';
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
    private authService: AuthService,
    private router: Router,
    public dialogRef: MatDialogRef<LoginDialog>,
    private dialog: MatDialog
  ) {}

  onSubmit() {
    this.isLoading = true;
    this.errorMessage = '';

    // Intentamos loguear con el servicio
    if (this.authService.login(this.username, this.password)) {
      this.dialogRef.close(true);
      this.router.navigate(['/pagina-principal']);
    } else {
      this.errorMessage = 'Usuario o contraseña incorrectos';
    }
    this.isLoading = false;
  }

  onRegister() {
    this.dialogRef.close();
    this.dialog.open(RegistroDialog, {
      width: '600px',
      panelClass: 'custom-dialog-container'
    });
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
