/**
 * dashboard.ts        05/02/2026
 * MIAGE de Toulouse, pas de copyright
 */

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { PlaylistService } from '../../core/services/playlist.service';
import { UtilisateurService } from '../../core/services/utilisateur.service';
import { Playlist } from '../../core/models/playlist.model';
import { Navbar } from '../../core/components/navbar/navbar';

import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { MatChip, MatChipSet } from '@angular/material/chips';

/**
 * Composant pour le dashboard des playlists
 */
@Component({
  selector: 'app-dashboard',
  imports: [
    FormsModule,
    RouterLink,
    Navbar,
    MatIcon,
    MatButton,
    MatIconButton,
    MatCard,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
    MatCardContent,
    MatCardActions,
    MatFormField,
    MatLabel,
    MatInput,
    MatSelect,
    MatOption,
    MatChip,
    MatChipSet
  ],
  templateUrl: './dashboard.html'
})
export class Dashboard implements OnInit {

  /** Liste des playlists */
  playlists: Playlist[] = [];

  /** Liste des playlists filtrées et triées */
  filteredPlaylists: Playlist[] = [];

  /** Terme de recherche */
  searchTerm = '';

  /** Style sélectionné pour le filtrage */
  selectedStyle = 'all';

  /** Liste des styles uniques */
  styles: string[] = [];

  /** Critère de tri */
  sortBy = 'nom';

  /** Ordre de tri */
  sortOrder: 'asc' | 'desc' = 'asc';

  /** Chargement en cours */
  loading = true;

  /** Erreur de chargement */
  error: string | null = null;

  /** Map des utilisateurs (id -> pseudo) */
  private utilisateursMap = new Map<number, string>();

  constructor(
    private playlistService: PlaylistService,
    private utilisateurService: UtilisateurService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  /**
   * Charge les utilisateurs et les playlists
   */
  private loadData(): void {
    this.loading = true;
    this.error = null;

    // Charger d'abord les utilisateurs (optionnel)
    this.utilisateurService.getUtilisateurs().pipe(
      catchError(() => of([]))
    ).subscribe(utilisateurs => {
      utilisateurs.forEach(u => this.utilisateursMap.set(u.id, u.pseudo));
    });

    // Charger les playlists
    this.playlistService.getPlaylists().subscribe({
      next: (playlists) => {
        this.playlists = playlists;
        this.extractStyles();
        this.applyFiltersAndSort();
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erreur lors du chargement des playlists:', err);
        this.error = 'Impossible de charger les données. Vérifiez que l\'API est lancée.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  /**
   * Recharge les données
   */
  loadPlaylists(): void {
    this.loadData();
  }

  /**
   * Retourne le nom du créateur à partir de son ID
   * @param createurId Identifiant du créateur
   * @returns Pseudo du créateur ou fallback
   */
  getNomCreateur(createurId: number): string {
    return this.utilisateursMap.get(createurId) ?? `Créateur #${createurId}`;
  }

  /**
   * Extrait les styles uniques des playlists
   */
  private extractStyles(): void {
    const stylesSet = new Set(this.playlists.map(p => p.style).filter(Boolean));
    this.styles = Array.from(stylesSet).sort();
  }

  /**
   * Applique les filtres et le tri aux playlists
   */
  applyFiltersAndSort(): void {
    let result = [...this.playlists];

    // Filtrage par recherche
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      result = result.filter(p =>
        p.nom.toLowerCase().includes(term) ||
        p.style.toLowerCase().includes(term)
      );
    }

    // Filtrage par style
    if (this.selectedStyle !== 'all') {
      result = result.filter(p => p.style === this.selectedStyle);
    }

    // Tri
    result.sort((a, b) => {
      let comparison = 0;

      switch (this.sortBy) {
        case 'nom':
          comparison = a.nom.localeCompare(b.nom);
          break;
        case 'style':
          comparison = a.style.localeCompare(b.style);
          break;
        case 'nbre_clics':
          comparison = a.nbre_clics - b.nbre_clics;
          break;
        case 'createur_id':
          comparison = a.createur_id - b.createur_id;
          break;
      }

      return this.sortOrder === 'asc' ? comparison : -comparison;
    });

    this.filteredPlaylists = result;
  }

  /**
   * Change le critère de tri
   * @param criteria Nouveau critère de tri
   */
  changeSortBy(criteria: string): void {
    if (this.sortBy === criteria) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = criteria;
      this.sortOrder = 'asc';
    }
    this.applyFiltersAndSort();
  }
}
