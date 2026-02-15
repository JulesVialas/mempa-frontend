// features/authentification/authentification.ts
import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Authentification } from "../../core/services/authentification";

/**
 * Composant d'authentification des utilisateurs.
 */
@Component({
  selector: 'app-authentification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './authentification.html',
  styleUrl: './authentification.css'
})

export class AuthentificationComponent {
  errorMessage: string = '';
  isUserValid: boolean = false;

  constructor(
    private authService: Authentification,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  // Fonction pour vérifier le pseudo
  isPseudoOk(pseudo: string) {
    if (!pseudo.trim()) {
      this.isUserValid = false;
      return;
    }

    this.authService.verifyPseudo(pseudo).subscribe({
      next: (data) => {
        if (data) {
          this.isUserValid = true;
        } else {
          this.isUserValid = false;
          this.errorMessage = "Pseudo inconnu.";
        }

        // Mettre à jour l'écran
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.isUserValid = false;
        this.errorMessage = "Erreur serveur";

        this.cd.detectChanges();
      }
    });
  }
  login(pseudo: string  , password: string) {
    this.authService.verifyPassword(pseudo, password).subscribe({
      next: (data) => {
        if (data) {
          console.log("login success", data.token);
          localStorage.setItem("token", data.token);
          this.router.navigate(['/dashboard']);
        } else {
          this.errorMessage = "Mot de passe incorrect.";
        }
      },
      error: (err) => {
        console.error(err);
      }
    })
  }
}
