import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RepositorioService } from '../../services/repositorio.service';
import { AuthService } from '../../../RegistroModuloC/services/auth.service';
import { Publicacion } from '../../interfaces/publicacion.interface';
import { PublicacionDialog } from '../publicacion-dialog/publicacion-dialog';
import { DetallePublicacion } from '../detalle-publicacion/detalle-publicacion';

@Component({
  selector: 'app-blog-principal',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule],
  templateUrl: './blog-principal.html',
  styleUrls: ['./blog-principal.css'],
})
export class BlogPrincipal implements OnInit {
  // Variables de control y datos
  listaPublicaciones: Publicacion[] = [];
  listaMostrada: Publicacion[] = [];
  filtroBusqueda: string = '';
  categoriaActual: string = 'Todas';
  categorias: string[] = ['Salud Mental', 'Tips', 'Guías', 'Orientación'];

  esPsicologo: boolean = false;

  constructor(
    private repoService: RepositorioService,
    private authService: AuthService,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.cargarDatos();

    // Verificar el rol del usuario
    const user = this.authService.usuarioActual;
    if (user && user.tipoUsuario === 'Psicólogo') {
      this.esPsicologo = true;
    }
  }

  cargarDatos() {
    this.listaPublicaciones = this.repoService.obtenerTodas();
    this.filtrar();
  }

  // Lógica de filtrado sencilla
  filtrar() {
    let temporal = this.repoService.buscar(this.filtroBusqueda);

    if (this.categoriaActual !== 'Todas') {
      temporal = temporal.filter((p) => p.categoria === this.categoriaActual);
    }

    this.listaMostrada = temporal;
  }

  cambiarCategoria(cat: string) {
    this.categoriaActual = cat;
    this.filtrar();
  }

  // Abrir detalle
  verDetalle(pub: Publicacion) {
    this.dialog.open(DetallePublicacion, {
      width: '800px',
      data: pub,
    });
  }

  // CRUD para Psicólogos
  abrirDialogoCrear() {
    const dialogRef = this.dialog.open(PublicacionDialog, {
      width: '600px',
      data: { modo: 'crear' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.cargarDatos();
      }
    });
  }

  abrirDialogoEditar(pub: Publicacion) {
    const dialogRef = this.dialog.open(PublicacionDialog, {
      width: '600px',
      data: { modo: 'editar', publicacion: pub },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.cargarDatos();
      }
    });
  }

  eliminar(pub: Publicacion) {
    if (confirm(`¿Estás seguro de eliminar "${pub.titulo}"?`)) {
      this.repoService.eliminar(pub.id);
      this.cargarDatos();
    }
  }
}
