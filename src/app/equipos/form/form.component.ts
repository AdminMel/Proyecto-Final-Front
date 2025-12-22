import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EquiposService } from '../../shared/services/equipos.service';
import { LigasService } from '../../shared/services/ligas.service';
import { EntrenadoresService } from '../../shared/services/entrenadores.service';
import { Liga } from '../../shared/models/liga';
import { Entrenador } from '../../shared/models/entrenador';

@Component({
  selector: 'app-equipos-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  id?: number;
  loading = false;

  ligas: Liga[] = [];
  entrenadores: Entrenador[] = [];

  form = this.fb.group({
    nombre: ['', Validators.required],
    ligaId: [null as number | null, Validators.required],
    entrenadorId: [null as number | null],
    partidosGanados: [0, [Validators.required, Validators.min(0)]]
  });

  constructor(
    private fb: FormBuilder,
    private svc: EquiposService,
    private ligasSvc: LigasService,
    private entrenSvc: EntrenadoresService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.ligasSvc.getAll().subscribe({ next: (d) => this.ligas = d });
    this.entrenSvc.getAll().subscribe({ next: (d) => this.entrenadores = d });

    const paramId = this.route.snapshot.paramMap.get('id');
    if (paramId) {
      this.id = +paramId;
      this.load();
    }
  }

  load() {
    this.svc.getById(this.id!).subscribe({
      next: (e) => this.form.patchValue({
        nombre: e.nombre,
        ligaId: e.ligaId,
        entrenadorId: e.entrenadorId,
        partidosGanados: e.partidosGanados
      })
    });
  }

  save() {
    if (this.form.invalid) return;
    this.loading = true;

    const body: any = {
      nombre: this.form.value.nombre!,
      ligaId: this.form.value.ligaId!,
      entrenadorId: this.form.value.entrenadorId ?? null,
      partidosGanados: this.form.value.partidosGanados ?? 0
    };

    const req = this.id ? this.svc.update(this.id, body) : this.svc.create(body);

    req.subscribe({
      next: () => { this.loading = false; this.router.navigate(['/equipos']); },
      error: () => { this.loading = false; }
    });
  }
}
