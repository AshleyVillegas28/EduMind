import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Auth } from '../services/auth';
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
  isLoggedIn = false;
  userName = '';
  private authSubscription?: Subscription;

  constructor(
    public globalService: Global,
    private authService: Auth,
    public dialog: MatDialog
  ) {}

  openLogin(): void {
    this.dialog.open(LoginDialog, {
      width: '550px',
      panelClass: 'custom-dialog-container',
      disableClose: false
    });
  }

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.userName = this.authService.getCurrentUser();

    this.authSubscription = this.authService.getAuthState().subscribe((authState) => {
      this.isLoggedIn = authState.isAuthenticated;
      this.userName = authState.user;
    });
  }

  onAcercaDe(): void {
    alert(
      'EduMind - Aplicacion que brinda orientación académica, apoyo emocional y recursos de bienestar a los estudiantes universitarios',
    );
  }

  logout(): void {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
