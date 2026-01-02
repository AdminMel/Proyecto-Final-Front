import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LigasService } from '../../shared/services/ligas.service';
import { Liga } from '../../shared/models/liga';

@Component({
  selector: 'app-ligas-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent {
  liga?: Liga;

  constructor(
    private route: ActivatedRoute,
    private ligasSvc: LigasService
  ) {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.ligasSvc.getById(id).subscribe({
      next: data => this.liga = data
    });
  }
}
