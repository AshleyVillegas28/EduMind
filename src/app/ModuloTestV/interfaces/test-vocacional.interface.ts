export interface Opcion {
  valor: number;
  texto: string;
}

export interface Pregunta {
  idPregunta: number;
  pregunta: string;
  categoria: string;
}

export interface ResultadoCategoria {
  categoria: string;
  puntuacion: number;
  maxPuntuacion: number;
  nivelInteres: string;
  perfil: string;
  interpretacion: string;
  carreras: string[];
  mensaje: string;
}

export interface Test {
  id: string;
  nombre: string;
  descripcion: string;
  cantidadPreguntas: number;
  categorias: string[];
  preguntas: Pregunta[];
}
