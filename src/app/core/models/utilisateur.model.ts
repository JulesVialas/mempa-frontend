/**
 * utilisateur.model.ts       12/02/2026
 * MIAGE de Toulouse, pas de copyright
 */

/**
 * Interface représentant un utilisateur
 */
export interface Utilisateur {
  id: number;
  pseudo: string;
  email: string;
  mot_de_passe: string;
  date_inscription: string;
}