import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { ModuloEduMind } from '../tabla-crud/tabla-crud';

@Component({
  selector: 'app-editar-modulo',
  standalone: true,
  imports: [FormsModule, MatDialogModule],
  templateUrl: './editar-modulo.html',
  styleUrl: './editar-modulo.css',
})
export class EditarModulo {
  // Copia local del módulo para editar sin afectar la tabla hasta guardar
  modulo: ModuloEduMind;

  constructor(
    public dialogRef: MatDialogRef<EditarModulo>,
    @Inject(MAT_DIALOG_DATA) data: ModuloEduMind
  ) {
    // Se hace una copia para no mutar el objeto original mientras el usuario edita
    this.modulo = { ...data };
  }

  /** Cierra el dialog enviando los datos editados al componente padre */
  guardar(): void {
    this.dialogRef.close(this.modulo);
  }

  /** Cierra el dialog sin devolver datos (sin cambios) */
  cancelar(): void {
    this.dialogRef.close(null);
  }
}
