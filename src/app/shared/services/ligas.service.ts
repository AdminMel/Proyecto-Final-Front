import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Liga } from '../models/liga';

@Injectable({ providedIn: 'root' })
export class LigasService {
  private base = `${environment.apiUrl}/ligas`;
  constructor(private http: HttpClient) {}

  getAll(): Observable<Liga[]> {
    return this.http.get<Liga[]>(this.base);
  }
  getById(id: number): Observable<Liga> {
    return this.http.get<Liga>(`${this.base}/${id}`);
  }
  create(body: Liga): Observable<Liga> {
    return this.http.post<Liga>(this.base, body);
  }
  update(id: number, body: Liga): Observable<Liga> {
    return this.http.put<Liga>(`${this.base}/${id}`, body);
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}
