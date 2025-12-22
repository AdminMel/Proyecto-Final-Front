import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { JugadoresService } from '../../shared/services/jugadores.service';
import { Jugador } from '../../shared/models/jugador';

@Component({
  selector: 'app-jugadores-by-equipo',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './jugadores-by-equipo.component.html',
  styleUrl: './jugadores-by-equipo.component.css'
})
export class JugadoresByEquipoComponent {
  equipoId!: number;
  jugadores: Jugador[] = [];
  loading = true;

  constructor(private route: ActivatedRoute, private svc: JugadoresService) {
    this.equipoId = +this.route.snapshot.paramMap.get('id')!;
    this.load();
  }

  load() {
    this.loading = true;
    this.svc.getByEquipo(this.equipoId).subscribe({
      next: (d) => { this.jugadores = d; this.loading = false; },
      error: () => this.loading = false
    });
  }
}
