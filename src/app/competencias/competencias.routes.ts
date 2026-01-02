import { Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { ResultComponent } from './result/result.component';

export const COMPETENCIAS_ROUTES: Routes = [
  { path: '', component: ListComponent },
  { path: 'new', component: FormComponent },
  { path: ':id/result', component: ResultComponent },
];
