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
  // Estado para controlar que pantalla mostrar
  pantalla: 'inicio' | 'ejecucion' | 'resultado' = 'inicio';
  
  // Datos que se pasan entre pantallas
  testSeleccionado: Test | null = null;
  resultados: ResultadoCategoria[] = [];

  // Recibir test de la pantalla inicio
  iniciar(test: Test) {
    this.testSeleccionado = test;
    this.pantalla = 'ejecucion';
  }

  // Recibir resultados de la ejecucion
  finalizar(res: ResultadoCategoria[]) {
    this.resultados = res;
    this.pantalla = 'resultado';
  }

  // Volver a empezar
  irInicio() {
    this.pantalla = 'inicio';
    this.testSeleccionado = null;
    this.resultados = [];
  }
}
