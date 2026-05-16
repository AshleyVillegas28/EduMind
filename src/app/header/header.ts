import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AuthService } from '../RegistroModuloC/services/auth.service';
import { Global } from '../services/global';
import { LoginDialog } from '../login-dialog/login-dialog';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule, MatDialogModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit, OnDestroy {
  constructor(
    public globalService: Global,
    public authService: AuthService,
    public dialog: MatDialog,
    private router: Router,
  ) {}

  openLogin(): void {
    this.dialog.open(LoginDialog, {
      width: '550px',
      panelClass: 'custom-dialog-container',
      disableClose: false,
    });
  }

  ngOnInit() {
  }

  // Getters para el HTML
  get estaLogueado() {
    return this.authService.estaLogueado();
  }

  get nombreUsuario() {
    return this.authService.usuarioActual ? this.authService.usuarioActual.nombreCompleto : 'Invitado';
  }

  goToProfile() {
    this.router.navigate(['/perfil-usuario']);
  }

  onAcercaDe(): void {
    alert(
      'EduMind - Aplicacion que brinda orientación académica, apoyo emocional y recursos de bienestar a los estudiantes universitarios',
    );
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    // No subscription needed for signals
  }
}
