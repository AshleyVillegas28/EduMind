export interface Publicacion {
  id: string;
  titulo: string;
  descripcion: string;
  autor: string;
  categoria: string;
  fecha: string;
  imagenUrl?: string;
  pdfUrl?: string;
  etiquetas: string[];
}
