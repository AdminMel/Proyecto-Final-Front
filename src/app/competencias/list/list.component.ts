import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CompetenciasService } from '../../shared/services/competencias.service';
import { Competencia } from '../../shared/models/competencia';

@Component({
  selector: 'app-competencias-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  competencias: Competencia[] = [];
  loading = true;

  constructor(private svc: CompetenciasService) {
    this.load();
  }

  load() {
    this.loading = true;
    this.svc.getAll().subscribe({
      next: (data) => { this.competencias = data; this.loading = false; },
      error: () => this.loading = false
    });
  }

  delete(id?: number) {
    if (!id) return;
    if (!confirm('¿Eliminar competencia?')) return;
    this.svc.delete(id).subscribe({ next: () => this.load() });
  }
}
