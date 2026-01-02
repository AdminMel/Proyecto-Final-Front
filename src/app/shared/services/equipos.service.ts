import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Equipo } from '../models/equipo';

@Injectable({ providedIn: 'root' })
export class EquiposService {
  private base = `${environment.apiUrl}/equipos`;
  constructor(private http: HttpClient) {}

  getAll(): Observable<Equipo[]> {
    return this.http.get<Equipo[]>(this.base);
  }

  getById(id: number): Observable<Equipo> {
    return this.http.get<Equipo>(`${this.base}/${id}`);
  }

  create(body: Equipo): Observable<Equipo> {
    return this.http.post<Equipo>(this.base, body);
  }

  update(id: number, body: Equipo): Observable<Equipo> {
    return this.http.put<Equipo>(`${this.base}/${id}`, body);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }

    getByLiga(ligaId: number) {
    return this.http.get<any[]>(`${environment.apiUrl}/ligas/${ligaId}/equipos`);
  }

}
