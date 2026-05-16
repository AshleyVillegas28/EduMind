import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-pagina-principal',
  imports: [RouterLink],
  templateUrl: './pagina-principal.html',
  styleUrl: './pagina-principal.css',
})
export class PaginaPrincipal {
  constructor(private router: Router) {}

  goToTest() {
    this.router.navigate(['/test-vocacional']);
  }
}
