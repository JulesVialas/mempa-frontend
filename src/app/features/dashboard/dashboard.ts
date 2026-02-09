/**
 * dashboard.ts        05/02/2026
 * MIAGE de Toulouse, pas de copyright
 */

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlaylistService } from '../../core/services/playlist.service';
import { Playlist } from '../../core/models/playlist.model';
import { Navbar } from '../../core/components/navbar/navbar';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { MatChip, MatChipSet } from '@angular/material/chips';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    FormsModule,
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

/**
 * Composant pour le dashboard des playlists
 */
export class Dashboard implements OnInit {

  /** Liste des playlists */
  playlists: Playlist[] = [];

  /** Liste des playlists filtrées et triées */
  filteredPlaylists: Playlist[] = [];

  /** Terme de recherche */
  searchTerm: string = '';

  /** Style sélectionné pour le filtrage */
  selectedStyle: string = 'all';

  /** Liste des styles uniques */
  styles: string[] = [];

  /** Critère de tri */
  sortBy: string = 'nom';

  /** Ordre de tri */
  sortOrder: 'asc' | 'desc' = 'asc';

  /** Chargement en cours */
  loading: boolean = true;

  /** Erreur de chargement */
  error: string | null = null;

  /** Constructeur */
  constructor(
    private playlistService: PlaylistService,
    private cdr: ChangeDetectorRef
  ) {}

  /**
   * Charge les playlists depuis l'API
   */
  ngOnInit(): void {
    this.loadPlaylists();
  }

  /**
   * Charge les playlists depuis l'API
   */
  loadPlaylists(): void {
    this.loading = true;
    this.error = null;

    this.playlistService.getPlaylists().subscribe({
      next: (data) => {
        console.log('Playlists reçues de l\'API :', data);
        this.playlists = data;
        this.extractStyles();
        this.applyFiltersAndSort();
        this.loading = false;
        console.log('Loading set to false:', this.loading);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erreur lors du chargement des playlists :', err);
        console.error('Détails de l\'erreur :', err.status, err.statusText, err.message);
        this.error = 'Impossible de charger les playlists. Vérifiez que l\'API est lancée sur http://localhost:3000';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  /**
   * Extrait les styles uniques des playlists
   */
  extractStyles(): void {
    const stylesSet = new Set<string>();
    this.playlists.forEach(p => {
      if (p.style) {
        stylesSet.add(p.style);
      }
    });
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
        p.nom_createur.toLowerCase().includes(term) ||
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
        case 'nom_createur':
          comparison = a.nom_createur.localeCompare(b.nom_createur);
          break;
      }

      return this.sortOrder === 'asc' ? comparison : -comparison;
    });

    this.filteredPlaylists = result;
  }

  /**
   * Change le critère de tri
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

  /**
   * Réinitialise tous les filtres
   */
  resetFilters(): void {
    this.searchTerm = '';
    this.selectedStyle = 'all';
    this.sortBy = 'nom';
    this.sortOrder = 'asc';
    this.applyFiltersAndSort();
  }
}
