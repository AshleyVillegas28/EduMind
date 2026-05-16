import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../interfaces/usuario.interface';

@Component({
  selector: 'app-perfil-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './perfil-usuario.html',
  styleUrls: ['./perfil-usuario.css']
})
export class PerfilUsuario implements OnInit {
  // Variables locales del componente
  usuario: Usuario | null = null;
  modoEdicion: boolean = false;
  datosEditados: any = {};

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // Al cargar el componente, pedimos el usuario al servicio
    this.usuario = this.authService.usuarioActual;
    if (this.usuario) {
      // Clonamos los datos para poder editarlos sin cambiar el original
      this.datosEditados = {
        carrera: this.usuario.carrera,
        semestre: this.usuario.semestre,
        infoAdicional: this.usuario.infoAdicional
      };
    }
  }

  // Activa o desactiva la edicion
  cambiarModo() {
    this.modoEdicion = !this.modoEdicion;
  }

  // Guardar los cambios en el servicio
  guardar() {
    const exito = this.authService.actualizar(this.datosEditados);
    if (exito) {
      this.usuario = this.authService.usuarioActual;
      this.modoEdicion = false;
      alert('Tus datos han sido actualizados con éxito.');
    } else {
      alert('Ocurrió un error al intentar guardar.');
    }
  }

  volver() {
    this.router.navigate(['/pagina-principal']);
  }
}
