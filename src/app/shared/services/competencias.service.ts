import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Competencia } from '../models/competencia';

@Injectable({ providedIn: 'root' })
export class CompetenciasService {
  private base = `${environment.apiUrl}/competencias`;
  constructor(private http: HttpClient) {}

  getAll(): Observable<Competencia[]> {
    return this.http.get<Competencia[]>(this.base);
  }

  create(body: Competencia): Observable<Competencia> {
    return this.http.post<Competencia>(this.base, body);
  }

  update(id: number, body: Competencia): Observable<Competencia> {
    return this.http.put<Competencia>(`${this.base}/${id}`, body);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}
