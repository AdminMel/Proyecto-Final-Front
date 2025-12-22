import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LigasService } from '../../shared/services/ligas.service';
import { Liga } from '../../shared/models/liga';

@Component({
  selector: 'app-ligas-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  ligas: Liga[] = [];
  loading = true;

  constructor(private ligasSvc: LigasService) {
    this.load();
  }

  load() {
    this.loading = true;
    this.ligasSvc.getAll().subscribe({
      next: data => {
        this.ligas = data;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  delete(id?: number) {
    if (!id) return;
    if (!confirm('¿Eliminar liga?')) return;

    this.ligasSvc.delete(id).subscribe({
      next: () => this.load()
    });
  }
}
