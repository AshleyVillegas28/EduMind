import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultadoCategoria } from '../../interfaces/test-vocacional.interface';
import { TestVocacionalService } from '../../services/test-vocacional.service';

@Component({
  selector: 'app-test-resultado',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './test-resultado.html',
  styleUrls: ['./test-resultado.css']
})
export class TestResultadoComponent implements OnInit {
  @Input() resultados: ResultadoCategoria[] = [];
  @Output() onReset = new EventEmitter<void>();

  recomendacionGeneral: string = '';

  constructor(private testService: TestVocacionalService) {}

  ngOnInit() {
    this.recomendacionGeneral = this.testService.obtenerRecomendacionGeneral(this.resultados);
  }

  getNivelClass(nivel: string): string {
    if (nivel === 'Interés alto') return 'interest-alto';
    if (nivel === 'Interés moderado') return 'interest-moderado';
    return 'interest-bajo';
  }
}
