import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { JugadoresService } from '../../shared/services/jugadores.service';
import { EquiposService } from '../../shared/services/equipos.service';
import { Equipo } from '../../shared/models/equipo';

@Component({
  selector: 'app-jugadores-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  id?: number;
  loading = false;

  equipos: Equipo[] = [];

  form = this.fb.group({
    nombre: ['', Validators.required],
    edad: [18, [Validators.required, Validators.min(1)]],
    posicion: ['', Validators.required],
    equipoId: [null as number | null]
  });

  constructor(
    private fb: FormBuilder,
    private svc: JugadoresService,
    private equiposSvc: EquiposService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.equiposSvc.getAll().subscribe({ next: (d) => this.equipos = d });

    const paramId = this.route.snapshot.paramMap.get('id');
    if (paramId) {
      this.id = +paramId;
      this.load();
    }
  }

  load() {
    this.svc.getById(this.id!).subscribe({
      next: (j) => this.form.patchValue({
        nombre: j.nombre,
        edad: j.edad,
        posicion: j.posicion,
        equipoId: j.equipoId
      })
    });
  }

  save() {
    if (this.form.invalid) return;
    this.loading = true;

    const body: any = {
      nombre: this.form.value.nombre!,
      edad: this.form.value.edad!,
      posicion: this.form.value.posicion!,
      equipoId: this.form.value.equipoId ?? null
    };

    const req = this.id ? this.svc.update(this.id, body) : this.svc.create(body);

    req.subscribe({
      next: () => { this.loading = false; this.router.navigate(['/jugadores']); },
      error: () => { this.loading = false; }
    });
  }
}
