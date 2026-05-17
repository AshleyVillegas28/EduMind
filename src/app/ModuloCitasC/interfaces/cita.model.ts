export interface Cita {
  id: string;
  estudianteId: string; // Para identificar quién solicita la cita
  psicologoNombre: string;
  psicologoEspecialidad: string;
  modalidad: 'Virtual' | 'Presencial';
  fecha: string;
  hora: string;
  motivo: string;
  estado: 'Pendiente' | 'Aceptada' | 'Rechazada' | 'Completada' | 'Cancelada';
}
