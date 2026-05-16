import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Datos guardados en el navegador
  usuarios: Usuario[] = [];
  usuarioActual: Usuario | null = null;

  constructor() {
    this.cargarDatos();
  }

  // Cargar usuarios y sesión desde localStorage al iniciar
  cargarDatos() {
    const usersData = localStorage.getItem('usuarios');
    if (usersData) {
      this.usuarios = JSON.parse(usersData);
    }

    const sessionData = localStorage.getItem('sesion');
    if (sessionData) {
      this.usuarioActual = JSON.parse(sessionData);
    }
  }

  // Guardar un nuevo usuario
  registrar(nuevo: Usuario): boolean {
    // Verificar si ya existe
    const existe = this.usuarios.find(u => u.usuario === nuevo.usuario || u.correo === nuevo.correo);
    if (existe) {
      return false;
    }

    this.usuarios.push(nuevo);
    localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
    return true;
  }

  // Iniciar sesión
  login(user: string, pass: string): boolean {
    const encontrado = this.usuarios.find(u => u.usuario === user && u.password === pass);
    if (encontrado) {
      this.usuarioActual = encontrado;
      localStorage.setItem('sesion', JSON.stringify(encontrado));
      return true;
    }
    return false;
  }

  // Cerrar sesión
  logout() {
    this.usuarioActual = null;
    localStorage.removeItem('sesion');
  }

  // Actualizar datos del perfil
  actualizar(datos: any): boolean {
    if (!this.usuarioActual) return false;

    // Buscar y actualizar en la lista de todos los usuarios
    for (let i = 0; i < this.usuarios.length; i++) {
      if (this.usuarios[i].id === this.usuarioActual.id) {
        this.usuarios[i].carrera = datos.carrera;
        this.usuarios[i].semestre = datos.semestre;
        this.usuarios[i].infoAdicional = datos.infoAdicional;
        
        // Actualizar sesión actual
        this.usuarioActual = this.usuarios[i];
        localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
        localStorage.setItem('sesion', JSON.stringify(this.usuarioActual));
        return true;
      }
    }
    return false;
  }

  // Saber si hay alguien logueado
  estaLogueado(): boolean {
    return this.usuarioActual !== null;
  }
}
