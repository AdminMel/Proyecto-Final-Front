import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EntrenadoresService } from '../../shared/services/entrenadores.service';
import { Entrenador } from '../../shared/models/entrenador';

@Component({
  selector: 'app-entrenadores-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent {
  entrenador?: Entrenador;

  constructor(private route: ActivatedRoute, private svc: EntrenadoresService) {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.svc.getById(id).subscribe({ next: (d) => this.entrenador = d });
  }
}
