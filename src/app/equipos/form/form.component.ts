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
      })
    });
  }

  save() {
    if (this.form.invalid) return;
    this.loading = true;

    const ligaId = Number(this.form.value.ligaId);

    // OJO: si viene null/'' => undefined, y NO se envía al backend
    const entrenadorIdRaw = this.form.value.entrenadorId;
    const entrenadorId =
      entrenadorIdRaw === null || entrenadorIdRaw === undefined || entrenadorIdRaw === ('' as any)
        ? undefined
        : Number(entrenadorIdRaw);

    const body: any = {
      nombre: this.form.value.nombre!,
      ligaId: ligaId
    };

    // ✅ sólo agrega entrenadorId si existe
    if (entrenadorId !== undefined && !Number.isNaN(entrenadorId)) {
      body.entrenadorId = entrenadorId;
    }

    const req$ = this.id
      ? this.svc.update(this.id, body)
      : this.svc.create(body);

    req$.subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/equipos']);
      },
      error: (err) => {
        console.error('ERROR CREAR/EDITAR EQUIPO:', err);
        this.loading = false;
      }
    });
  }
}
