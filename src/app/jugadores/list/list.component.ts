import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { JugadoresService } from '../../shared/services/jugadores.service';
import { Jugador } from '../../shared/models/jugador';

@Component({
  selector: 'app-jugadores-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  jugadores: Jugador[] = [];
  loading = true;

  constructor(private svc: JugadoresService) {
    this.load();
  }

  load() {
    this.loading = true;
    this.svc.getAll().subscribe({
      next: (data) => { this.jugadores = data; this.loading = false; },
      error: () => this.loading = false
    });
  }

  delete(id?: number) {
    if (!id) return;
    if (!confirm('¿Eliminar jugador?')) return;
    this.svc.delete(id).subscribe({ next: () => this.load() });
  }
}
