import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthInfoDialog } from '../RegistroModuloC/components/auth-info-dialog/auth-info-dialog';

@Component({
  selector: 'app-pagina-principal',
  imports: [RouterLink],
  templateUrl: './pagina-principal.html',
  styleUrl: './pagina-principal.css',
})
export class PaginaPrincipal {
  constructor(
    private router: Router,
    private dialog: MatDialog
  ) {}

  openAuthInfo() {
    this.dialog.open(AuthInfoDialog, {
      width: '500px',
      panelClass: 'custom-dialog-container'
    });
  }

  goToTest() {
    this.router.navigate(['/test-vocacional']);
  }

  goToRepo() {
    this.router.navigate(['/repositorio-bienestar']);
  }
}
