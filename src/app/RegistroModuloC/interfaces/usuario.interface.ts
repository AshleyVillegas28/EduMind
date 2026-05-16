export interface Usuario {
  id: string;
  nombreCompleto: string;
  usuario: string;
  correo: string;
  password?: string;
  carrera: string;
  semestre: string;
  tipoUsuario: 'Estudiante' | 'Psicólogo';
  fotoPerfil?: string;
  infoAdicional?: string;
  fechaRegistro: string;
}
