import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../interfaces/usuario.interface';

@Component({
  selector: 'app-registro-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registro-dialog.html',
  styleUrls: ['./registro-dialog.css']
})
export class RegistroDialog {
  // Datos del formulario vinculados con ngModel
  datos: any = {
    nombreCompleto: '',
    usuario: '',
    correo: '',
    password: '',
    confirmarPassword: '',
    tipoUsuario: 'Estudiante',
    carrera: '',
    semestre: '',
    infoAdicional: '',
    fotoPerfil: ''
  };

  error: string = '';

  constructor(
    private dialogRef: MatDialogRef<RegistroDialog>,
    private authService: AuthService
  ) {}

  enviarFormulario() {
    // Validar contraseñas
    if (this.datos.password !== this.datos.confirmarPassword) {
      this.error = 'Las contraseñas no coinciden.';
      return;
    }

    // Crear el objeto usuario
    const nuevoUsuario: Usuario = {
      id: Date.now().toString(),
      nombreCompleto: this.datos.nombreCompleto,
      usuario: this.datos.usuario,
      correo: this.datos.correo,
      password: this.datos.password,
      tipoUsuario: this.datos.tipoUsuario,
      carrera: this.datos.carrera,
      semestre: this.datos.semestre,
      infoAdicional: this.datos.infoAdicional,
      fotoPerfil: this.datos.fotoPerfil,
      fechaRegistro: new Date().toISOString()
    };

    // Llamar al servicio para guardar
    const guardado = this.authService.registrar(nuevoUsuario);
    
    if (guardado) {
      alert('Registro exitoso. Ahora puedes iniciar sesión.');
      this.dialogRef.close(true);
    } else {
      this.error = 'El usuario o el correo ya existen.';
    }
  }

  cerrar() {
    this.dialogRef.close();
  }
}
