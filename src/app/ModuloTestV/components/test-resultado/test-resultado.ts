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
  @Input() listaResultados: ResultadoCategoria[] = [];
  @Output() reiniciarTest = new EventEmitter<void>();

  textoRecomendacion: string = '';

  constructor(private serv: TestVocacionalService) {}

  ngOnInit() {
    // Pedimos la recomendacion general al servicio
    this.textoRecomendacion = this.serv.getRecomendacion(this.listaResultados);
  }

  // Metodo para cambiar color segun nivel
  claseColor(nivel: string): string {
    if (nivel === 'Interés alto') return 'interest-alto';
    if (nivel === 'Interés moderado') return 'interest-moderado';
    return 'interest-bajo';
  }
}
