import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EquiposService } from '../../shared/services/equipos.service';
import { Equipo } from '../../shared/models/equipo';

@Component({
  selector: 'app-equipos-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  equipos: Equipo[] = [];
  loading = true;

  constructor(private svc: EquiposService) {
    this.load();
  }

  load() {
    this.loading = true;
    this.svc.getAll().subscribe({
      next: (data) => { this.equipos = data; this.loading = false; },
      error: () => this.loading = false
    });
  }

  delete(id?: number) {
    if (!id) return;
    if (!confirm('¿Eliminar equipo?')) return;
    this.svc.delete(id).subscribe({ next: () => this.load() });
  }
}
