import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RepositorioService } from '../../services/repositorio.service';
import { AuthService } from '../../../RegistroModuloC/services/auth.service';
import { Publicacion } from '../../interfaces/publicacion.interface';

@Component({
  selector: 'app-publicacion-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './publicacion-dialog.html',
  styleUrls: ['./publicacion-dialog.css']
})
export class PublicacionDialog implements OnInit {
  modo: 'crear' | 'editar' = 'crear';
  
  // Objeto temporal para el formulario
  pub: Publicacion = {
    id: '',
    titulo: '',
    descripcion: '',
    autor: '',
    categoria: 'Salud Mental',
    fecha: '',
    etiquetas: [],
    imagenUrl: '',
    pdfUrl: ''
  };

  etiquetasString: string = '';

  constructor(
    private dialogRef: MatDialogRef<PublicacionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private repoService: RepositorioService,
    private authService: AuthService
  ) {
    this.modo = data.modo;
    if (this.modo === 'editar' && data.publicacion) {
      this.pub = { ...data.publicacion };
      this.etiquetasString = this.pub.etiquetas.join(', ');
    }
  }

  ngOnInit() {
    if (this.modo === 'crear') {
      const user = this.authService.usuarioActual;
      this.pub.autor = user ? user.nombreCompleto : 'Anónimo';
      this.pub.fecha = new Date().toISOString();
    }
  }

  // Simular subida de PDF convirtiendolo a Base64 (Lógica de estudiante)
  seleccionarPDF(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.pub.pdfUrl = e.target.result; // Guardamos el contenido del archivo
      };
      reader.readAsDataURL(file);
    }
  }

  guardar() {
    // Convertir el string de etiquetas a un array
    this.pub.etiquetas = this.etiquetasString.split(',').map(t => t.trim());

    if (this.modo === 'crear') {
      this.pub.id = Date.now().toString();
      this.repoService.crear(this.pub);
    } else {
      this.repoService.editar(this.pub.id, this.pub);
    }

    this.dialogRef.close(true);
  }

  cerrar() {
    this.dialogRef.close();
  }
}
