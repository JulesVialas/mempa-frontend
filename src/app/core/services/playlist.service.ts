/**
 * playlist.service.ts       05/02/2026
 * MIAGE de Toulouse, pas de copyright
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Playlist } from '../models/playlist.model';
import { environment } from '../../../environments/environment';
import {Morceau} from "../models/morceau.model";

/**
 * Service pour gérer les opérations liées aux playlists
 */
@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  private readonly apiUrl = `${environment.apiUrl}/playlists`;

  constructor(private http: HttpClient) {}

  /**
   * Récupère la liste des playlists depuis l'API
   * @returns Observable contenant la liste des playlists
   */
  getPlaylists(): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(this.apiUrl);
  }

  /**
   * Récupère une playlist par son ID
   * @param id Identifiant de la playlist
   * @returns Observable contenant la playlist
   */
  getPlaylistById(id: number): Observable<Playlist> {
    return this.http.get<Playlist>(`${this.apiUrl}/${id}`);
  }

  /**
   * Récupère les morceaux d'une playlist
   * @param playlistId Identifiant de la playlist
   * @returns Observable contenant la liste des morceaux
   */
  getContenuPlaylist(playlistId: number): Observable<Morceau[]> {
    return this.http.get<Morceau[]>(`${this.apiUrl}/${playlistId}/morceaux`);
  }
}
