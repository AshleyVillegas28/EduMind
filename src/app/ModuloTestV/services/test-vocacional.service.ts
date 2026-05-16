import { Injectable } from '@angular/core';
import { Test, ResultadoCategoria } from '../interfaces/test-vocacional.interface';
import { TESTS_DISPONIBLES, RESULTADOS_POR_CATEGORIA } from '../data/test-data';

@Injectable({
  providedIn: 'root'
})
export class TestVocacionalService {

  // Variables para guardar lo que pasa en el test
  testElegido: Test | null = null;
  respuestasUsuario: any = {};

  constructor() { }

  // Obtener todos los tests de la data
  getTests(): Test[] {
    return TESTS_DISPONIBLES;
  }

  // Iniciar un nuevo test
  empezarTest(test: Test) {
    this.testElegido = test;
    this.respuestasUsuario = {};
  }

  // Guardar respuesta de una pregunta
  guardarPuntaje(id: number, puntos: number) {
    this.respuestasUsuario[id] = puntos;
  }

  // Calcular los resultados al final
  sacarResultados(): ResultadoCategoria[] {
    if (!this.testElegido) return [];

    let resultadosFinales: ResultadoCategoria[] = [];

    // Recorremos las categorias del test
    for (let cat of this.testElegido.categorias) {
      let suma = 0;
      let contadorPreguntas = 0;

      // Buscamos preguntas de esta categoria y sumamos sus puntos
      for (let preg of this.testElegido.preguntas) {
        if (preg.categoria === cat) {
          suma += this.respuestasUsuario[preg.idPregunta] || 0;
          contadorPreguntas++;
        }
      }

      // Buscamos la info extra de la categoria
      const info = RESULTADOS_POR_CATEGORIA[cat];
      
      // Calculamos nivel (bajo, medio, alto)
      let nivel = 'Interés bajo';
      let porcentaje = (suma / (contadorPreguntas * 5)) * 100;
      if (porcentaje > 40) nivel = 'Interés moderado';
      if (porcentaje > 70) nivel = 'Interés alto';

      // Agregamos al array
      resultadosFinales.push({
        categoria: cat,
        puntuacion: suma,
        maxPuntuacion: contadorPreguntas * 5,
        nivelInteres: nivel,
        perfil: info.perfil || 'General',
        interpretacion: info.interpretacion || '',
        carreras: info.carreras || [],
        mensaje: info.mensaje || ''
      });
    }

    // Ordenar de mayor a menor
    return resultadosFinales.sort((a, b) => b.puntuacion - a.puntuacion);
  }

  // Una recomendacion simple basada en el primer resultado
  getRecomendacion(lista: ResultadoCategoria[]): string {
    if (lista.length === 0) return '';
    
    let primero = lista[0];
    
    if (primero.puntuacion > 18) {
      return '¡Felicidades! Tienes una vocación muy clara. Sigue tus sueños en esta área.';
    } else if (primero.puntuacion > 10) {
      return 'Tienes buenos intereses aquí, pero podrías investigar un poco más otras opciones.';
    } else {
      return 'Sigue explorando, tal vez tu verdadera vocación esté en otra de nuestras pruebas.';
    }
  }

  // Calcular el porcentaje de progreso para la barra
  calcularProgreso(index: number): number {
    if (!this.testElegido) return 0;
    let total = this.testElegido.preguntas.length;
    return ((index + 1) / total) * 100;
  }
}
