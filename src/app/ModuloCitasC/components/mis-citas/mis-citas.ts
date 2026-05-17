import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CitasService } from '../../services/citas';
import { Cita } from '../../interfaces/cita.model';

@Component({
  selector: 'app-mis-citas',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './mis-citas.html',
  styleUrls: ['./mis-citas.css'],
})
export class MisCitasComponent implements OnInit {
  todasLasCitas: Cita[] = [];
  citasFiltradas: Cita[] = [];
  filtroActual: string = 'Todas';

  constructor(private citasService: CitasService) {}

  ngOnInit(): void {
    this.cargarCitas();
  }

  cargarCitas() {
    this.todasLasCitas = this.citasService.obtenerCitas();
    this.filtrar(this.filtroActual);
  }

  filtrar(estado: string) {
    this.filtroActual = estado;
    if (estado === 'Todas') {
      this.citasFiltradas = this.todasLasCitas;
    } else {
      this.citasFiltradas = this.todasLasCitas.filter((c) => c.estado === estado);
    }
  }

  cancelarCita(id: string) {
    if (confirm('¿Estás seguro de que deseas cancelar esta cita?')) {
      this.citasService.cancelarCita(id);
      this.cargarCitas(); // Recargar la lista para que desaparezca visualmente
    }
  }
}
