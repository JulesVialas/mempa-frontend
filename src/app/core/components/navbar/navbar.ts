/**
 * navbar.ts        05/02/2026
 * MIAGE de Toulouse, pas de copyright
 */

import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [
    MatToolbar,
    MatButton,
    MatIconButton,
    MatIcon,
    RouterLink
  ],
  templateUrl: './navbar.html',
})

/**
 * Composant pour la barre de navigation
 */
export class Navbar {

  protected logout() {
    //TODO
  }
}
