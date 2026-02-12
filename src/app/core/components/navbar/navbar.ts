/**
 * navbar.ts        05/02/2026
 * MIAGE de Toulouse, pas de copyright
 */

import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

/**
 * Composant pour la barre de navigation
 */
@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    MatToolbar,
    MatButton,
    MatIconButton,
    MatIcon
  ],
  templateUrl: './navbar.html'
})
export class Navbar {

  /**
   * Déconnecte l'utilisateur
   */
  logout(): void {
    // TODO: Implémenter la déconnexion
  }
}
