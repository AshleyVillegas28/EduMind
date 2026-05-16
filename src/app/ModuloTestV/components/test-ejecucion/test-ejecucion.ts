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
  @Input() test!: Test;
  @Output() onFinish = new EventEmitter<ResultadoCategoria[]>();

  currentIdx = 0;
  progreso = 0;
  opciones = OPCIONES_GLOBALES;
  respuestaTemporal: number | null = null;
  respuestasUsuario: { [key: number]: number } = {};

  constructor(private testService: TestVocacionalService) {}

  ngOnInit() {
    this.testService.iniciarTest(this.test);
    this.updateProgreso();
  }

  get preguntaActual(): Pregunta {
    return this.test.preguntas[this.currentIdx];
  }

  seleccionarOpcion(valor: number) {
    this.respuestaTemporal = valor;
  }

  updateProgreso() {
    this.progreso = this.testService.getProgreso(this.currentIdx);
  }

  siguiente() {
    if (this.respuestaTemporal !== null) {
      this.testService.guardarRespuesta(this.preguntaActual.idPregunta, this.respuestaTemporal);
      this.respuestasUsuario[this.currentIdx] = this.respuestaTemporal;

      if (this.currentIdx < this.test.preguntas.length - 1) {
        this.currentIdx++;
        this.respuestaTemporal = this.respuestasUsuario[this.currentIdx] ?? null;
        this.updateProgreso();
      } else {
        const resultados = this.testService.calcularResultados();
        this.onFinish.emit(resultados);
      }
    }
  }

  anterior() {
    if (this.currentIdx > 0) {
      this.currentIdx--;
      this.respuestaTemporal = this.respuestasUsuario[this.currentIdx] ?? null;
      this.updateProgreso();
    }
  }
}
