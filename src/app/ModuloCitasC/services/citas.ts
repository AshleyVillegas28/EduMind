import { Injectable } from '@angular/core';
import { Cita } from '../interfaces/cita.model';

@Injectable({
  providedIn: 'root',
})
export class CitasService {
  // Esta es la llave bajo la cual se guardará todo en LocalStorage
  private readonly STORAGE_KEY = 'citas_edumind';

  constructor() {}

  // Obtener todas las citas guardadas
  obtenerCitas(): Cita[] {
    const citasStr = localStorage.getItem(this.STORAGE_KEY);
    if (citasStr) {
      return JSON.parse(citasStr);
    }
    return []; // Retorna arreglo vacío si no hay nada guardado aún
  }

  // Agendar una nueva cita
  agendarCita(cita: Cita): void {
    const citas = this.obtenerCitas();

    // Generamos un ID único y asignamos estado inicial
    cita.id = Math.random().toString(36).substr(2, 9);
    cita.estado = 'Pendiente';

    // Añadimos al arreglo y guardamos
    citas.push(cita);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(citas));
  }

  // Cancelar una cita
  cancelarCita(id: string): void {
    const citas = this.obtenerCitas();
    const index = citas.findIndex((c) => c.id === id);
    if (index !== -1) {
      citas[index].estado = 'Cancelada';
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(citas));
    }
  }
}
