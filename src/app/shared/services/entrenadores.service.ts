import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Entrenador } from '../models/entrenador';

@Injectable({ providedIn: 'root' })
export class EntrenadoresService {
  private base = `${environment.apiUrl}/entrenadores`;
  constructor(private http: HttpClient) {}

  getAll(): Observable<Entrenador[]> {
    return this.http.get<Entrenador[]>(this.base);
  }

  getById(id: number): Observable<Entrenador> {
    return this.http.get<Entrenador>(`${this.base}/${id}`);
  }

  create(body: Entrenador): Observable<Entrenador> {
    return this.http.post<Entrenador>(this.base, body);
  }

  update(id: number, body: Entrenador): Observable<Entrenador> {
    return this.http.put<Entrenador>(`${this.base}/${id}`, body);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}
