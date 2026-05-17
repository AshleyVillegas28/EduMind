import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

export interface Psicologo {
  id: string;
  nombre: string;
  especialidad: string;
  rating: string;
  experiencia: string;
  avatar: string;
  disponibilidad: string;
}

@Component({
  selector: 'app-seleccionar-profesional',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './seleccionar-profesional.html',
  styleUrls: ['./seleccionar-profesional.css'],
})
export class SeleccionarProfesionalComponent {
  psicologos: Psicologo[] = [
    {
      id: 'psi_1',
      nombre: 'Dra. Ana López',
      especialidad: 'Psicología Clínica',
      rating: '⭐ 4.8/5',
      experiencia: '💼 5 años exp.',
      avatar: 'A',
      disponibilidad: 'Disponible hoy',
    },
    {
      id: 'psi_2',
      nombre: 'Dr. Carlos Mendoza',
      especialidad: 'Psicología Educativa',
      rating: '⭐ 4.9/5',
      experiencia: '💼 8 años exp.',
      avatar: 'C',
      disponibilidad: 'Disponible mañana',
    },
    {
      id: 'psi_3',
      nombre: 'Dra. Valeria Ruiz',
      especialidad: 'Terapia Cognitivo-Conductual',
      rating: '⭐ 4.7/5',
      experiencia: '💼 3 años exp.',
      avatar: 'V',
      disponibilidad: 'Disponible en 2 días',
    },
  ];

  constructor(private router: Router) {}

  seleccionarPsicologo(psicologo: Psicologo) {
    this.router.navigate(['/agendar-cita'], { state: { psicologo } });
  }
}
