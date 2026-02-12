/**
 * utilisateur.service.ts       12/02/2026
 * MIAGE de Toulouse, pas de copyright
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Utilisateur } from '../models/utilisateur.model';
import { environment } from '../../../environments/environment';

/**
 * Service pour gérer les opérations liées aux utilisateurs
 */
@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  private readonly apiUrl = `${environment.apiUrl}/utilisateurs`;

  constructor(private http: HttpClient) {}

  /**
   * Récupère tous les utilisateurs depuis l'API
   * @returns Observable contenant la liste des utilisateurs
   */
  getUtilisateurs(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(this.apiUrl);
  }

  /**
   * Récupère un utilisateur par son ID
   * @param id Identifiant de l'utilisateur
   * @returns Observable contenant l'utilisateur
   */
  getUtilisateurById(id: number): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(`${this.apiUrl}/${id}`);
  }
}
