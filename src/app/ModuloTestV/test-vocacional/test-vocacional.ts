import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestInicioComponent } from '../components/test-inicio/test-inicio';
import { TestEjecucionComponent } from '../components/test-ejecucion/test-ejecucion';
import { TestResultadoComponent } from '../components/test-resultado/test-resultado';
import { Test, ResultadoCategoria } from '../interfaces/test-vocacional.interface';

@Component({
  selector: 'app-test-vocacional',
  standalone: true,
  imports: [CommonModule, TestInicioComponent, TestEjecucionComponent, TestResultadoComponent],
  templateUrl: './test-vocacional.html',
  styleUrls: ['./test-vocacional.css']
})
export class TestVocacionalComponent {
  estado: 'inicio' | 'ejecucion' | 'resultado' = 'inicio';
  testSeleccionado: Test | null = null;
  resultadosFinales: ResultadoCategoria[] = [];

  comenzarTest(test: Test) {
    this.testSeleccionado = test;
    this.estado = 'ejecucion';
  }

  mostrarResultados(resultados: ResultadoCategoria[]) {
    this.resultadosFinales = resultados;
    this.estado = 'resultado';
  }

  reiniciar() {
    this.estado = 'inicio';
    this.testSeleccionado = null;
    this.resultadosFinales = [];
  }
}
