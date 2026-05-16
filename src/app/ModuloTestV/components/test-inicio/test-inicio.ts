import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestVocacionalService } from '../../services/test-vocacional.service';
import { Test } from '../../interfaces/test-vocacional.interface';

@Component({
  selector: 'app-test-inicio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './test-inicio.html',
  styleUrls: ['./test-inicio.css']
})
export class TestInicioComponent implements OnInit {
  // Listas para mostrar en el HTML
  listaGenerales: Test[] = [];
  listaEspecificos: Test[] = [];

  @Output() enviarTest = new EventEmitter<Test>();

  constructor(private miServicio: TestVocacionalService) {}

  ngOnInit() {
    // Traer los tests del servicio
    const todos = this.miServicio.getTests();
    
    // Filtrar por tipo usando el ID
    this.listaGenerales = todos.filter(t => t.id.includes('general'));
    this.listaEspecificos = todos.filter(t => t.id.includes('especifico'));
  }

  // Cuando el usuario hace clic en un test
  empezar(test: Test) {
    this.enviarTest.emit(test);
  }
}
