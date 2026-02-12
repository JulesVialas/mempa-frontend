/**
 * playlist.service.ts       05/02/2026
 * MIAGE de Toulouse, pas de copyright
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Playlist } from '../models/playlist.model';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})

/**
 * Service pour gérer les opérations liées aux playlists
 */
export class PlaylistService {

  /** URL de l'API */
  private apiUrl = `${environment.apiUrl}/playlists`;

  /** Constructeur */
  constructor(private http: HttpClient) { }

  /**
   * Récupère la liste des playlists depuis l'API
   */
  getPlaylists(): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(this.apiUrl);
  }

  /**
   * Crée une nouvelle playlist en envoyant les données à l'API
   * @param playlist
   */
  createPlaylist(playlist: Partial<Playlist>): Observable<Playlist> {
    return this.http.post<Playlist>(this.apiUrl, playlist);
  }
}
