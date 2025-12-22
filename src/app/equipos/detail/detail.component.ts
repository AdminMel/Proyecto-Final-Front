import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EquiposService } from '../../shared/services/equipos.service';
import { Equipo } from '../../shared/models/equipo';

@Component({
  selector: 'app-equipos-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent {
  equipo?: Equipo;

  constructor(private route: ActivatedRoute, private svc: EquiposService) {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.svc.getById(id).subscribe({ next: (data) => this.equipo = data });
  }
}
