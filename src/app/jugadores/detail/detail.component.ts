import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { JugadoresService } from '../../shared/services/jugadores.service';
import { Jugador } from '../../shared/models/jugador';

@Component({
  selector: 'app-jugadores-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent {
  jugador?: Jugador;

  constructor(private route: ActivatedRoute, private svc: JugadoresService) {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.svc.getById(id).subscribe({ next: (data) => this.jugador = data });
  }
}
