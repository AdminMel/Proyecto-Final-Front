import { Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { FormComponent } from './form/form.component';

export const JUGADORES_ROUTES: Routes = [
  { path: '', component: ListComponent },
  { path: 'new', component: FormComponent },
  { path: ':id', component: DetailComponent },
  { path: ':id/edit', component: FormComponent },
];
