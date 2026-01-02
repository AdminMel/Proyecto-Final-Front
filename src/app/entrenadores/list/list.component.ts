import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EntrenadoresService } from '../../shared/services/entrenadores.service';
import { Entrenador } from '../../shared/models/entrenador';

@Component({
  selector: 'app-entrenadores-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  entrenadores: Entrenador[] = [];
  loading = true;

  constructor(private svc: EntrenadoresService) {
    this.load();
  }

  load() {
    this.loading = true;
    this.svc.getAll().subscribe({
      next: (d) => { this.entrenadores = d; this.loading = false; },
      error: () => this.loading = false
    });
  }

  delete(id?: number) {
    if (!id) return;
    if (!confirm('¿Eliminar entrenador?')) return;
    this.svc.delete(id).subscribe({ next: () => this.load() });
  }
}
