import { Routes } from '@angular/router';
import { Dashboard } from './features/dashboard/dashboard';
import {CreationPlaylist} from './features/creation-playlist/creation-playlist';

export const routes: Routes = [
  { path: 'dashboard', component: Dashboard },
  { path: 'creation-playlist', component: CreationPlaylist },];
