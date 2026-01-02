import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Jugador } from '../models/jugador';

@Injectable({ providedIn: 'root' })
export class JugadoresService {
  private base = `${environment.apiUrl}/jugadores`;
  constructor(private http: HttpClient) {}

  getAll(): Observable<Jugador[]> {
    return this.http.get<Jugador[]>(this.base);
  }

  getById(id: number): Observable<Jugador> {
    return this.http.get<Jugador>(`${this.base}/${id}`);
  }

  create(body: Jugador): Observable<Jugador> {
    return this.http.post<Jugador>(this.base, body);
  }

  update(id: number, body: Jugador): Observable<Jugador> {
    return this.http.put<Jugador>(`${this.base}/${id}`, body);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }

  getByEquipo(equipoId: number) {
    return this.http.get<Jugador[]>(`${environment.apiUrl}/equipos/${equipoId}/jugadores`);
  }
}
