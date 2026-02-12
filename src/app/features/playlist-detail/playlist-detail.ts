/**
 * playlist-detail.ts        12/02/2026
 * MIAGE de Toulouse, pas de copyright
 */

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { PlaylistService } from '../../core/services/playlist.service';
import { Playlist } from '../../core/models/playlist.model';
import { Morceau } from '../../core/models/morceau.model';
import { Navbar } from '../../core/components/navbar/navbar';

import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatChip } from '@angular/material/chips';

/**
 * Composant pour afficher les détails d'une playlist
 */
@Component({
  selector: 'app-playlist-detail',
  imports: [
    Navbar,
    MatIcon,
    MatButton,
    MatIconButton,
    MatCard,
    MatCardContent,
    MatChip
  ],
  templateUrl: './playlist-detail.html'
})
export class PlaylistDetail implements OnInit {

  /** Playlist à afficher */
  playlist: Playlist | null = null;

  /** Liste des morceaux de la playlist */
  morceaux: Morceau[] = [];

  /** Chargement en cours */
  loading = true;

  /** Erreur de chargement */
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private playlistService: PlaylistService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadPlaylistData(+id);
    } else {
      this.error = 'ID de playlist invalide';
      this.loading = false;
    }
  }

  /**
   * Charge la playlist et ses morceaux
   * @param id Identifiant de la playlist
   */
  private loadPlaylistData(id: number): void {
    this.loading = true;
    this.error = null;

    forkJoin({
      playlist: this.playlistService.getPlaylistById(id),
      morceaux: this.playlistService.getContenuPlaylist(id).pipe(
        catchError(() => of([]))
      )
    }).subscribe({
      next: ({ playlist, morceaux }) => {
        this.playlist = playlist;
        this.morceaux = morceaux;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erreur lors du chargement:', err);
        this.error = 'Impossible de charger la playlist. Vérifiez que l\'API est lancée.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  /**
   * Retourne au dashboard
   */
  goBack(): void {
    this.router.navigate(['/dashboard']);
  }

  /**
   * Formate une date ISO en format lisible
   * @param dateString Date au format ISO
   * @returns Date formatée
   */
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
