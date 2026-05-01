import { Routes } from '@angular/router';
import { Login } from './login/login';
import { PaginaPrincipal } from './pagina-principal/pagina-principal';
import { TablaCrud } from './tabla-crud/tabla-crud';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'pagina-principal', component: PaginaPrincipal },
  { path: 'tabla-crud', component: TablaCrud },
  { path: '**', redirectTo: '/login' },
];
