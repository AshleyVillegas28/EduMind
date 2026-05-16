import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Publicacion } from '../../interfaces/publicacion.interface';

@Component({
  selector: 'app-detalle-publicacion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-publicacion.html',
  styleUrls: ['./detalle-publicacion.css']
})
export class DetallePublicacion {

  constructor(
    private dialogRef: MatDialogRef<DetallePublicacion>,
    @Inject(MAT_DIALOG_DATA) public pub: Publicacion
  ) {}

  verPDF() {
    if (this.pub.pdfUrl) {
      // Abrir el PDF en una nueva pestaña (como es base64 funciona directo)
      const win = window.open();
      if (win) {
        win.document.write(`<iframe src="${this.pub.pdfUrl}" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>`);
      }
    }
  }

  cerrar() {
    this.dialogRef.close();
  }
}
