import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Pregunta {
  id: number;
  categoria: string;
  texto: string;
  fecha: string;
  respuesta?: string;
  fechaRespuesta?: string;  
}

@Component({
  selector: 'app-buzon-anonimo',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './buzon-anonimo.html',
  styleUrl: './buzon-anonimo.css',
})

export class BuzonAnonimo {
     // Estado del formulario 
  mensajeTexto = '';
  categoriaSeleccionada = '';
  enviado = false;
  enviando = false;
  errorEnvio = '';
  contadorChars = signal(0);
  readonly MAX_CHARS = 500;

  categorias = [
    { valor: 'academica', etiqueta: '📚 Académica' },
    { valor: 'bienestar', etiqueta: '💚 Bienestar' },
    { valor: 'administrativa', etiqueta: '🏛️ Administrativa' },
    { valor: 'orientacion', etiqueta: '🧭 Orientación' },
    { valor: 'otro', etiqueta: '💬 Otro' },
  ];

  // Muro de dudas (preguntas respondidas) 
  vistaActiva: 'buzon' | 'muro' = 'buzon';
  filtroCategoria = 'todas';
  busqueda = '';

  preguntasRespondidas: Pregunta[] = [
    {
      id: 1,
      categoria: 'academica',
      texto: '¿Cuántas materias puedo cursar por semestre sin afectar mi promedio?',
      fecha: '10/05/2025',
      respuesta:
        'Se recomienda no superar 6 materias por semestre. Considera tu carga laboral y actividades extracurriculares. Si tienes dudas, agenda una cita con tu tutor académico.',
      fechaRespuesta: '12/05/2025',
    },
    {
      id: 2,
      categoria: 'bienestar',
      texto: '¿Qué hago si siento mucha ansiedad antes de los exámenes?',
      fecha: '08/05/2025',
      respuesta:
        'Es completamente normal. Te recomendamos técnicas de respiración 4-7-8, organizar tu tiempo de estudio con anticipación y acudir al servicio de psicología universitaria. No estás solo/a en esto.',
      fechaRespuesta: '09/05/2025',
    },
    {
      id: 3,
      categoria: 'administrativa',
      texto: '¿Cómo solicito una beca de movilidad internacional?',
      fecha: '05/05/2025',
      respuesta:
        'Debes dirigirte a la Dirección de Relaciones Internacionales con tu expediente académico actualizado, carta de motivación y certificado de idioma si aplica. Las convocatorias abren en marzo y septiembre.',
      fechaRespuesta: '06/05/2025',
    },
    {
      id: 4,
      categoria: 'orientacion',
      texto: '¿Cómo sé si la carrera que elegí es realmente la que quiero?',
      fecha: '01/05/2025',
      respuesta:
        'Habla con profesionales del área, solicita prácticas tempranas y haz el test vocacional disponible en nuestra plataforma. El Departamento de Orientación tiene sesiones individuales gratuitas para estudiantes.',
      fechaRespuesta: '03/05/2025',
    },
    {
      id: 5,
      categoria: 'academica',
      texto: '¿Puedo cambiar de carrera en primer año sin perder mis materias?',
      fecha: '28/04/2025',
      respuesta:
        'Sí, existe un proceso de homologación de materias. Debes presentar la solicitud antes del tercer mes del semestre. Consulta el reglamento académico y habla con el coordinador de tu carrera actual.',
      fechaRespuesta: '30/04/2025',
    },
  ];

  get preguntasFiltradas(): Pregunta[] {
    return this.preguntasRespondidas.filter((p) => {
      const coincideCategoria =
        this.filtroCategoria === 'todas' || p.categoria === this.filtroCategoria;
      const coincideBusqueda =
        this.busqueda.trim() === '' ||
        p.texto.toLowerCase().includes(this.busqueda.toLowerCase()) ||
        (p.respuesta?.toLowerCase().includes(this.busqueda.toLowerCase()) ?? false);
      return coincideCategoria && coincideBusqueda;
    });
  }

  onTextoChange(): void {
    this.contadorChars.set(this.mensajeTexto.length);
  }

  cambiarVista(vista: 'buzon' | 'muro'): void {
    this.vistaActiva = vista;
  }

  enviarMensaje(): void {
    if (!this.mensajeTexto.trim() || !this.categoriaSeleccionada) {
      this.errorEnvio = 'Por favor completa todos los campos antes de enviar.';
      return;
    }
    if (this.mensajeTexto.length > this.MAX_CHARS) {
      this.errorEnvio = `El mensaje no puede superar los ${this.MAX_CHARS} caracteres.`;
      return;
    }

    this.enviando = true;
    this.errorEnvio = '';

    // Simular envío 
    setTimeout(() => {

      const nuevaPregunta: Pregunta = {
      id: this.preguntasRespondidas.length + 1,
      categoria: this.categoriaSeleccionada,
      texto: this.mensajeTexto,
      fecha: new Date().toLocaleDateString('es-EC'),
      respuesta: undefined,
      fechaRespuesta: undefined,
  };
    this.preguntasRespondidas.unshift(nuevaPregunta);

      this.enviando = false;
      this.enviado = true;
    }, 1200);
  }

  resetFormulario(): void {
    this.mensajeTexto = '';
    this.categoriaSeleccionada = '';
    this.enviado = false;
    this.errorEnvio = '';
    this.contadorChars.set(0);
  }

  getEtiquetaCategoria(valor: string): string {
    return this.categorias.find((c) => c.valor === valor)?.etiqueta ?? valor;
  }

  getColorCategoria(categoria: string): string {
    const colores: Record<string, string> = {
      academica: 'tag-azul',
      bienestar: 'tag-verde',
      administrativa: 'tag-naranja',
      orientacion: 'tag-cian',
      otro: 'tag-purpura',
    };
    return colores[categoria] ?? 'tag-purpura';
  }
}


