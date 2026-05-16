import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestVocacionalService } from '../../services/test-vocacional.service';
import { Test, ResultadoCategoria, Pregunta } from '../../interfaces/test-vocacional.interface';
import { OPCIONES_GLOBALES } from '../../data/test-data';

@Component({
  selector: 'app-test-ejecucion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './test-ejecucion.html',
  styleUrls: ['./test-ejecucion.css']
})
export class TestEjecucionComponent implements OnInit {
  @Input() testActual!: Test;
  @Output() alFinalizar = new EventEmitter<ResultadoCategoria[]>();

  indicePregunta = 0;
  progresoBarra = 0;
  opcionesDisponibles = OPCIONES_GLOBALES;
  puntosPregunta: number | null = null;
  misRespuestas: any = {};

  constructor(private servicio: TestVocacionalService) {}

  ngOnInit() {
    this.servicio.empezarTest(this.testActual);
    this.actualizarProgreso();
  }

  get preg() {
    return this.testActual.preguntas[this.indicePregunta];
  }

  marcar(valor: number) {
    this.puntosPregunta = valor;
  }

  actualizarProgreso() {
    this.progresoBarra = this.servicio.calcularProgreso(this.indicePregunta);
  }

  irSiguiente() {
    if (this.puntosPregunta !== null) {
      // Guardamos la respuesta en el servicio
      this.servicio.guardarPuntaje(this.preg.idPregunta, this.puntosPregunta);
      this.misRespuestas[this.indicePregunta] = this.puntosPregunta;

      // Si no es la ultima, avanzamos
      if (this.indicePregunta < this.testActual.preguntas.length - 1) {
        this.indicePregunta++;
        // Si ya habia respondido esta pregunta antes (por boton anterior) recuperamos el valor
        this.puntosPregunta = this.misRespuestas[this.indicePregunta] || null;
        this.actualizarProgreso();
      } else {
        // Es la ultima, sacamos resultados
        const res = this.servicio.sacarResultados();
        this.alFinalizar.emit(res);
      }
    }
  }

  irAnterior() {
    if (this.indicePregunta > 0) {
      this.indicePregunta--;
      // Recuperamos lo que habia marcado
      this.puntosPregunta = this.misRespuestas[this.indicePregunta] || null;
      this.actualizarProgreso();
    }
  }
}
