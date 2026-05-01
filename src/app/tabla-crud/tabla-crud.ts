import { Component, inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { EditarModulo } from '../editar-modulo/editar-modulo';

// Interfaz que describe la forma de cada módulo
export interface ModuloEduMind {
  NModulo: number;
  Nombre: string;
  Responsable: string;
  Objetivo1: string;
  Objetivo2: string;
}

// Datos iniciales de los 5 módulos del portal EduMind
// Estos datos se muestran al cargar la tabla por primera vez
const MODULOS_DATA: ModuloEduMind[] = [
  {
    NModulo: 1,
    Nombre: 'Autenticación y Perfiles',
    Responsable: 'Ivan Chongllo',
    Objetivo1:
      'Implementar registro e inicio de sesión diferenciado para estudiantes y psicólogos.',
    Objetivo2: 'Gestionar perfiles de usuario con datos académicos y de contacto.',
  },
  {
    NModulo: 2,
    Nombre: 'Tests Vocacionales',
    Responsable: 'Ashley Villegas',
    Objetivo1: 'Diseñar tests interactivos con puntuación automática.',
    Objetivo2: 'Generar recomendaciones personalizadas según resultados del test.',
  },
  {
    NModulo: 3,
    Nombre: 'Repositorio de Bienestar',
    Responsable: 'Oliver Sanchez',
    Objetivo1: 'Crear un blog con artículos y guías publicados por psicólogos.',
    Objetivo2: 'Permitir la subida y descarga de recursos en formato PDF.',
  },
  {
    NModulo: 4,
    Nombre: 'Citas con Psicólogos',
    Responsable: 'Clarissa Centeno',
    Objetivo1: 'Desarrollar un sistema de reserva de citas con los profesionales disponibles.',
    Objetivo2: 'Enviar recordatorios y confirmaciones automáticas de citas.',
  },
  {
    NModulo: 5,
    Nombre: 'Buzón Anónimo',
    Responsable: 'Domenica Rosales',
    Objetivo1: 'Implementar un sistema de consultas anónimas para estudiantes.',
    Objetivo2: 'Mostrar las respuestas en un muro de dudas comunitario.',
  },
];

@Component({
  selector: 'app-tabla-crud',
  standalone: true,
  // Se importan los módulos necesarios para la tabla, el dialog y los formularios
  imports: [MatTableModule, MatDialogModule, FormsModule],
  templateUrl: './tabla-crud.html',
  styleUrl: './tabla-crud.css',
})
export class TablaCrud implements OnInit {
  // Columnas que se mostrarán en la tabla (el orden aquí define el orden visual)
  displayedColumns: string[] = [
    'NModulo',
    'Nombre',
    'Responsable',
    'Objetivo1',
    'Objetivo2',
    'Acciones',
  ];

  // MatTableDataSource permite filtrado y futuro soporte de paginación/sort
  dataSource = new MatTableDataSource<ModuloEduMind>(MODULOS_DATA);

  // Texto que el usuario escribe en el input de filtro
  filtroTexto: string = '';

  // inject() es la forma moderna en Angular 14+ de inyectar servicios
  readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    // Aquí se podría cargar datos desde un servicio HTTP en el futuro
  }

  // Aplica el filtro de texto a la dataSource
  // MatTableDataSource filtra sobre todos los campos del objeto
  aplicarFiltro(): void {
    this.dataSource.filter = this.filtroTexto.trim().toLowerCase();
  }

  // Limpia el buscador y restaura todos los datos en la tabla
  limpiarFiltro(): void {
    this.filtroTexto = '';
    this.dataSource.filter = '';
  }

  // Abre el dialog de edición pasando una copia
  // del módulo seleccionado como datos al dialog
  editarModulo(row: ModuloEduMind): void {
    const dialogRef = this.dialog.open(EditarModulo, {
      width: '500px',
      data: { ...row }, // Se pasa una copia para no mutar la tabla directamente
    });

    // Cuando el dialog cierra, recibimos el módulo editado (o null si canceló)
    dialogRef.afterClosed().subscribe((resultado: ModuloEduMind | null) => {
      if (resultado) {
        this.actualizarModulo(resultado);
      }
    });
  }

  // Reemplaza el módulo en el array por la versión editada
  // y notifica a MatTableDataSource para re-renderizar la tabla
  actualizarModulo(moduloEditado: ModuloEduMind): void {
    const index = this.dataSource.data.findIndex((m) => m.NModulo === moduloEditado.NModulo);

    if (index >= 0) {
      this.dataSource.data[index] = moduloEditado;
      // _updateChangeSubscription() fuerza la detección de cambios en la tabla
      this.dataSource._updateChangeSubscription();
    }
  }

  // Elimina el módulo del array por referencia
  eliminarModulo(row: ModuloEduMind): void {
    const confirmado = confirm(`¿Eliminar el módulo "${row.Nombre}"?`);
    if (!confirmado) return;

    const index = this.dataSource.data.indexOf(row);
    if (index >= 0) {
      this.dataSource.data.splice(index, 1);
      this.dataSource._updateChangeSubscription();
    }
  }
}
