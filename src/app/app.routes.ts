import { Routes } from '@angular/router';
import { Login } from './login/login';
import { PaginaPrincipal } from './pagina-principal/pagina-principal';
import { TablaCrud } from './tabla-crud/tabla-crud';
import { TestVocacionalComponent } from './ModuloTestV/test-vocacional/test-vocacional';
import { BuzonAnonimo } from './buzon-anonimo/buzon-anonimo';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'pagina-principal', component: PaginaPrincipal },
  { path: 'buzon-anonimo', component: BuzonAnonimo },
  { path: 'tabla-crud', component: TablaCrud },
  { path: 'test-vocacional', component: TestVocacionalComponent },
  { path: '**', redirectTo: '/login' },
];
