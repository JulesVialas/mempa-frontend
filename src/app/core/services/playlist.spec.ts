/**
 * playlist.spec.ts        05/02/2026
 * MIAGE de Toulouse, pas de copyright
 */

import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

import { PlaylistService } from './playlist.service';

describe('PlaylistService', () => {
  let service: PlaylistService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    });
    service = TestBed.inject(PlaylistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
