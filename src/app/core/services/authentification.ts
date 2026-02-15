import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Authentification {
  private apiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) { }

  verifyPseudo(pseudo: string): Observable<any> {
    return this.http.get(this.apiUrl + '?pseudo=' + pseudo);
  }
  verifyPassword(pseudo : string, password: string): Observable<any>{
    return this.http.post(this.apiUrl + '/login', {
      pseudo: pseudo,
      password: password,
    });
  }
}
