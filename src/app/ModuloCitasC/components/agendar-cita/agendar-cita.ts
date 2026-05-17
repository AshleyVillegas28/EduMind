import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CitasService } from '../../services/citas';
import { Cita } from '../../interfaces/cita.model';

@Component({
  selector: 'app-agendar-cita',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './agendar-cita.html',
  styleUrls: ['./agendar-cita.css'],
})
export class AgendarCitaComponent {
  // Objeto base ligado al formulario HTML
  nuevaCita: Cita = {
    id: '',
    estudianteId: 'estudiante_123', // En tu app real, saca esto de tu auth service/localStorage
    psicologoNombre: 'Dra. Ana López', // Datos quemados de ejemplo
    psicologoEspecialidad: 'Psicología Clínica',
    modalidad: 'Virtual',
    fecha: '',
    hora: '',
    motivo: '',
    estado: 'Pendiente',
  };

  constructor(
    private citasService: CitasService,
    private router: Router,
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state && navigation.extras.state['psicologo']) {
      const psicologo = navigation.extras.state['psicologo'];
      this.nuevaCita.psicologoNombre = psicologo.nombre;
      this.nuevaCita.psicologoEspecialidad = psicologo.especialidad;
    }
  }

  guardarCita() {
    // Validación básica
    if (this.nuevaCita.fecha && this.nuevaCita.hora && this.nuevaCita.motivo) {
      this.citasService.agendarCita(this.nuevaCita);
      alert('¡Cita agendada con éxito!');
      this.router.navigate(['/mis-citas']); // Asegúrate de tener esta ruta configurada
    } else {
      alert('Por favor, completa todos los campos.');
    }
  }
}
