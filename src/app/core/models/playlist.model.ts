/**
 * playlist.model.ts        05/02/2026
 * MIAGE de Toulouse, pas de copyright
 */

/**
 * Interface représentant une playlist
 */
export interface Playlist {
  id: number;
  nom: string;
  style: string;
  nbre_clics: number;
  createur_id: number;
  date_creation: string;
  date_modification: string;
  nom_createur?: string;
}
