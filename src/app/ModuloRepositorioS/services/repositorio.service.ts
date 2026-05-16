import { Injectable } from '@angular/core';
import { Publicacion } from '../interfaces/publicacion.interface';

@Injectable({
  providedIn: 'root'
})
export class RepositorioService {
  // Clave para guardar en el navegador
  private readonly KEY = 'repositorio_publicaciones';

  // Lista local de publicaciones
  publicaciones: Publicacion[] = [];

  constructor() {
    this.cargarDeLocalStorage();
  }

  // Cargar datos al iniciar el servicio
  cargarDeLocalStorage() {
    const data = localStorage.getItem(this.KEY);
    if (data) {
      this.publicaciones = JSON.parse(data);
    } else {
      // Datos de ejemplo para que no este vacio al inicio
      this.publicaciones = [
        {
          id: '1',
          titulo: 'Manejo del estrés universitario',
          descripcion: 'Una guía completa para organizar tus tiempos y reducir la ansiedad en exámenes.',
          autor: 'Psic. Ana García',
          categoria: 'Salud Mental',
          fecha: '2024-05-10',
          etiquetas: ['Estudio', 'Bienestar'],
          imagenUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500'
        },
        {
          id: '2',
          titulo: 'Tips para mejorar la concentración',
          descripcion: 'Pequeños cambios en tu rutina que harán la diferencia al estudiar.',
          autor: 'Psic. Carlos Ruiz',
          categoria: 'Tips',
          fecha: '2024-05-15',
          etiquetas: ['Concentración', 'Habilidades'],
          imagenUrl: 'https://images.unsplash.com/photo-1454165833767-027ffea9e778?w=500'
        }
      ];
      this.guardarEnLocalStorage();
    }
  }

  // Guardar la lista actual en el navegador
  guardarEnLocalStorage() {
    localStorage.setItem(this.KEY, JSON.stringify(this.publicaciones));
  }

  // Obtener todas las publicaciones
  obtenerTodas(): Publicacion[] {
    return this.publicaciones;
  }

  // Crear una nueva
  crear(nueva: Publicacion) {
    this.publicaciones.push(nueva);
    this.guardarEnLocalStorage();
  }

  // Editar una existente
  editar(id: string, datosActualizados: Publicacion) {
    const index = this.publicaciones.findIndex(p => p.id === id);
    if (index !== -1) {
      this.publicaciones[index] = { ...datosActualizados, id };
      this.guardarEnLocalStorage();
    }
  }

  // Eliminar una publicacion
  eliminar(id: string) {
    this.publicaciones = this.publicaciones.filter(p => p.id !== id);
    this.guardarEnLocalStorage();
  }

  // Buscar por titulo o categoria
  buscar(termino: string): Publicacion[] {
    termino = termino.toLowerCase();
    return this.publicaciones.filter(p => 
      p.titulo.toLowerCase().includes(termino) || 
      p.categoria.toLowerCase().includes(termino)
    );
  }
}
