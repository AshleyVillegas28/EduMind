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
  testsGenerales: Test[] = [];
  testsEspecificos: Test[] = [];
  @Output() onStart = new EventEmitter<Test>();

  constructor(private testService: TestVocacionalService) {}

  ngOnInit() {
    const allTests = this.testService.getTests();
    this.testsGenerales = allTests.filter(t => t.id.includes('general'));
    this.testsEspecificos = allTests.filter(t => t.id.includes('especifico'));
  }

  seleccionar(test: Test) {
    this.onStart.emit(test);
  }
}
