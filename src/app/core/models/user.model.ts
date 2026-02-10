/**
 * user.model.ts        09/02/2026
 * MIAGE de Toulouse, pas de copyright
 */

/**
 * Interface représentant un utilisateur
 */
export interface User {
  id: number;
  nom: string;
  email: string;
  mot_de_passe_hash: string;
  date_inscription: Date;
}
