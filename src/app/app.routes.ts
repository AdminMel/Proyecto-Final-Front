import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { authGuard } from './core/auth.guard';
import { ShellComponent } from './layout/shell/shell.component';
import { ENTRENADORES_ROUTES } from './entrenadores/entrenadores.routes';
import { EquiposByLigaComponent } from './ligas/equipos-by-liga/equipos-by-liga.component';
import { JugadoresByEquipoComponent } from './equipos/jugadores-by-equipo/jugadores-by-equipo.component';


export const routes: Routes = [
  { path: '', redirectTo: 'ligas', pathMatch: 'full' },

  // públicas
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // privadas dentro del dashboard
  {
    path: '',
    component: ShellComponent,
    canActivate: [authGuard],
    children: [
      { path: 'ligas', loadChildren: () => import('./ligas/ligas.routes').then(m => m.LIGAS_ROUTES) },
      { path: 'equipos', loadChildren: () => import('./equipos/equipos.routes').then(m => m.EQUIPOS_ROUTES) },
      { path: 'jugadores', loadChildren: () => import('./jugadores/jugadores.routes').then(m => m.JUGADORES_ROUTES) },
      { path: 'entrenadores', loadChildren: () => import('./entrenadores/entrenadores.routes').then(m => m.ENTRENADORES_ROUTES) },
      { path: 'competencias', loadChildren: () => import('./competencias/competencias.routes').then(m => m.COMPETENCIAS_ROUTES) }
    ]
  },

  { path: '**', redirectTo: 'ligas' }
];
