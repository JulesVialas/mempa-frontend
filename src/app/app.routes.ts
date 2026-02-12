/**
 * app.routes.ts        05/02/2026
 * MIAGE de Toulouse, pas de copyright
 */

import { Routes } from '@angular/router';
import { Dashboard } from './features/dashboard/dashboard';
import { PlaylistDetail } from './features/playlist-detail/playlist-detail';

/**
 * Configuration des routes de l'application
 */
export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: Dashboard },
  { path: 'playlist/:id', component: PlaylistDetail }
];
