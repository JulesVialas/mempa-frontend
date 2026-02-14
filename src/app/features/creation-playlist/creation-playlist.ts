  /**
   * creation-playlist.ts        12/02/2026
   * MIAGE de Toulouse, pas de copyright
   */

  import { Component } from '@angular/core';
  import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
  import {PlaylistService} from '../../core/services/playlist.service';
  import {Router} from '@angular/router';
  import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

  @Component({
    selector: 'app-creation-playlist',
    imports: [
      ReactiveFormsModule,
      MatSnackBarModule
    ],
    templateUrl: './creation-playlist.html',
    styleUrl: './creation-playlist.css',
  })

  /**
   * Composant pour la création des playlists
   */
  export class CreationPlaylist {

    playlistForm: FormGroup;

    constructor(
      private fb: FormBuilder,
      private playlistService: PlaylistService,
      private router: Router,
      private snackBar: MatSnackBar
    ) {
      /** * Initialisation du formulaire avec des règles de validation :
       * - nom : obligatoire et 3 caractères minimum
       * - style : obligatoire
       */
      this.playlistForm = this.fb.group({
        nom: ['', [Validators.required, Validators.minLength(3)]],
        style: ['', [Validators.required]]
      });
    }

    /**
     * Gère la soumission du formulaire vers le backend
     */
    onSubmit(): void {
      if (this.playlistForm.valid) {
        // On envoie les données au service
        this.playlistService.createPlaylist(this.playlistForm.value).subscribe({
          next: () => {
            this.snackBar.open('Playlist créée !', 'Fermer', { duration: 3000 });
            this.router.navigate(['/dashboard']); // Redirection après succès
          },
          error: (err) => {
            this.snackBar.open('Erreur lors de la création', 'Fermer');
            console.error('Erreur creation playlist :', err);
          }
        });
      }
    }

    /**
     * Annule l'action en cours et retourne au dashboard
     */
    onCancel(): void {
      this.router.navigate(['/dashboard']);
    }
  }
