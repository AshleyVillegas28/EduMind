import { Injectable } from '@angular/core';
import { Test, ResultadoCategoria, Pregunta } from '../interfaces/test-vocacional.interface';
import { TESTS_DISPONIBLES, RESULTADOS_POR_CATEGORIA } from '../data/test-data';

@Injectable({
  providedIn: 'root'
})
export class TestVocacionalService {

  private testActual: Test | null = null;
  private respuestas: { [idPregunta: number]: number } = {};

  constructor() { }

  getTests(): Test[] {
    return TESTS_DISPONIBLES;
  }

  getTestById(id: string): Test | undefined {
    return TESTS_DISPONIBLES.find(t => t.id === id);
  }

  iniciarTest(test: Test) {
    this.testActual = test;
    this.respuestas = {};
  }

  guardarRespuesta(idPregunta: number, valor: number) {
    this.respuestas[idPregunta] = valor;
  }

  private obtenerNivelInteres(puntuacion: number, totalPreguntas: number): string {
    const maxPuntaje = totalPreguntas * 5;
    const porcentaje = (puntuacion / maxPuntaje) * 100;
    
    if (porcentaje <= 40) return 'Interés bajo';
    if (porcentaje <= 70) return 'Interés moderado';
    return 'Interés alto';
  }

  calcularResultados(): ResultadoCategoria[] {
    if (!this.testActual) return [];

    const puntuacionesPorCategoria: { [categoria: string]: number } = {};
    
    // Inicializar contadores
    this.testActual.categorias.forEach(cat => {
      puntuacionesPorCategoria[cat] = 0;
    });

    // Sumar puntuaciones
    this.testActual.preguntas.forEach(pregunta => {
      const respuesta = this.respuestas[pregunta.idPregunta] || 0;
      puntuacionesPorCategoria[pregunta.categoria] += respuesta;
    });

    // Crear lista de resultados
    const resultados: ResultadoCategoria[] = this.testActual.categorias.map(cat => {
      const infoBase = RESULTADOS_POR_CATEGORIA[cat] || {
        perfil: 'General',
        interpretacion: 'Sin interpretación disponible.',
        carreras: [],
        mensaje: 'Continúa explorando tus opciones.'
      };

      const puntuacion = puntuacionesPorCategoria[cat];
      const preguntasEnCat = this.testActual!.preguntas.filter(p => p.categoria === cat).length;

      return {
        categoria: cat,
        puntuacion: puntuacion,
        maxPuntuacion: preguntasEnCat * 5,
        nivelInteres: this.obtenerNivelInteres(puntuacion, preguntasEnCat),
        perfil: infoBase.perfil!,
        interpretacion: infoBase.interpretacion!,
        carreras: infoBase.carreras!,
        mensaje: infoBase.mensaje!
      };
    });

    return resultados.sort((a, b) => b.puntuacion - a.puntuacion);
  }

  obtenerRecomendacionGeneral(resultados: ResultadoCategoria[]): string {
    if (resultados.length === 0) return '';

    const top1 = resultados[0];
    const top2 = resultados[1];
    const top3 = resultados[2];

    // Si el puntaje más alto es bajo
    if (top1.puntuacion <= 10) {
      return 'Aún estás en proceso de descubrir tus intereses. Explorar nuevas actividades y experiencias puede ayudarte.';
    }

    // Si hay varias áreas con puntajes altos similares (diferencia <= 2)
    const areasAltas = resultados.filter(r => r.puntuacion >= 18);
    if (areasAltas.length >= 2) {
      const diff = areasAltas[0].puntuacion - areasAltas[1].puntuacion;
      if (diff <= 2) {
        return 'Tus intereses son variados. Puedes explorar carreras interdisciplinarias que combinen varias de tus habilidades.';
      }
    }

    // Caso general de recomendación por similitud moderada
    if (top1.puntuacion > 10 && top1.puntuacion < 18) {
      return 'Te recomendamos investigar más sobre las carreras relacionadas para descubrir cuál se adapta mejor a tu personalidad.';
    }

    return '¡Excelente! Tienes un perfil muy definido hacia tu área principal. Explora las carreras recomendadas para dar el siguiente paso.';
  }

  getProgreso(currentIdx: number): number {
    if (!this.testActual) return 0;
    return ((currentIdx + 1) / this.testActual.preguntas.length) * 100;
  }
}
