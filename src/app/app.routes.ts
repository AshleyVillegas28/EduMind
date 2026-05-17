import { Routes } from '@angular/router';
import { Login } from './login/login';
import { PaginaPrincipal } from './pagina-principal/pagina-principal';
import { TablaCrud } from './tabla-crud/tabla-crud';
import { TestVocacionalComponent } from './ModuloTestV/test-vocacional/test-vocacional';
import { BuzonAnonimo } from './buzon-anonimo/buzon-anonimo';
import { PerfilUsuario } from './RegistroModuloC/components/perfil-usuario/perfil-usuario';
import { BlogPrincipal } from './ModuloRepositorioS/components/blog-principal/blog-principal';
import { MisCitasComponent } from './ModuloCitasC/components/mis-citas/mis-citas';
import { AgendarCitaComponent } from './ModuloCitasC/components/agendar-cita/agendar-cita';
import { SeleccionarProfesionalComponent } from './ModuloCitasC/components/seleccionar-profesional/seleccionar-profesional';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'pagina-principal', component: PaginaPrincipal },
  { path: 'buzon-anonimo', component: BuzonAnonimo },
  { path: 'tabla-crud', component: TablaCrud },
  { path: 'test-vocacional', component: TestVocacionalComponent },
  { path: 'perfil-usuario', component: PerfilUsuario },
  { path: 'repositorio-bienestar', component: BlogPrincipal },
  { path: 'mis-citas', component: MisCitasComponent },
  { path: 'seleccionar-profesional', component: SeleccionarProfesionalComponent },
  { path: 'agendar-cita', component: AgendarCitaComponent },
  { path: '**', redirectTo: '/login' },
];
