// features/authentification/authentification.ts
import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Authentification } from "../../core/services/authentification";


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
    private cd: ChangeDetectorRef // <--- AJOUTE ÇA
  ) {}

  // Fonction pour vérifier le pseudo
  isPseudoOk(pseudo: string) {
    if (!pseudo.trim()) {
      this.isUserValid = false;
      return;
    }

    this.authService.login(pseudo).subscribe({
      next: (data) => {
        if (data) {
          this.isUserValid = true;
          this.errorMessage = "";
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
}
