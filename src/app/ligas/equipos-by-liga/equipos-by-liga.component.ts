import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EquiposService } from '../../shared/services/equipos.service';
import { Equipo } from '../../shared/models/equipo';

@Component({
  selector: 'app-equipos-by-liga',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './equipos-by-liga.component.html',
  styleUrl: './equipos-by-liga.component.css'
})
export class EquiposByLigaComponent {
  ligaId!: number;
  equipos: Equipo[] = [];
  loading = true;

  constructor(private route: ActivatedRoute, private svc: EquiposService) {
    this.ligaId = +this.route.snapshot.paramMap.get('id')!;
    this.load();
  }

  load() {
    this.loading = true;
    this.svc.getByLiga(this.ligaId).subscribe({
      next: (d) => { this.equipos = d; this.loading = false; },
      error: () => this.loading = false
    });
  }
}
