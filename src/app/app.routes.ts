import { Routes } from '@angular/router';
import { AuthentificationComponent } from './features/authentification/authentification';
import { Dashboard } from './features/dashboard/dashboard';

export const routes: Routes = [
  { path: '', component: AuthentificationComponent }, // Page par défaut
  { path: 'dashboard', component: Dashboard }
];
