import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CompetenciasService } from '../../shared/services/competencias.service';
import { LigasService } from '../../shared/services/ligas.service';
import { EquiposService } from '../../shared/services/equipos.service';
import { Liga } from '../../shared/models/liga';
import { Equipo } from '../../shared/models/equipo';

@Component({
  selector: 'app-competencias-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  loading = false;
  ligas: Liga[] = [];
  equipos: Equipo[] = [];

  form = this.fb.group({
    fecha: ['', Validators.required],
    ligaId: [null as number | null, Validators.required],
    equipoLocalId: [null as number | null, Validators.required],
    equipoVisitanteId: [null as number | null, Validators.required],
    golesLocal: [0, [Validators.required, Validators.min(0)]],
    golesVisitante: [0, [Validators.required, Validators.min(0)]],
    finalizado: [false, Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private svc: CompetenciasService,
    private ligasSvc: LigasService,
    private equiposSvc: EquiposService,
    private router: Router
  ) {
    this.ligasSvc.getAll().subscribe({ next: d => this.ligas = d });
    this.equiposSvc.getAll().subscribe({ next: d => this.equipos = d });
  }

  save() {
    if (this.form.invalid) return;
    this.loading = true;

    const body: any = {
      fecha: this.form.value.fecha!,
      ligaId: this.form.value.ligaId!,
      ligaNombre: null,
      equipoLocalId: this.form.value.equipoLocalId!,
      equipoLocalNombre: null,
      equipoVisitanteId: this.form.value.equipoVisitanteId!,
      equipoVisitanteNombre: null,
      golesLocal: this.form.value.golesLocal ?? 0,
      golesVisitante: this.form.value.golesVisitante ?? 0,
      finalizado: this.form.value.finalizado ?? false
    };

    this.svc.create(body).subscribe({
      next: () => { this.loading = false; this.router.navigate(['/competencias']); },
      error: () => { this.loading = false; }
    });
  }
}
import { AbstractControl, ValidationErrors } from '@angular/forms';

function equiposDistintosValidator(group: AbstractControl): ValidationErrors | null {
  const local = group.get('equipoLocalId')?.value;
  const visitante = group.get('equipoVisitanteId')?.value;
  if (local && visitante && local === visitante) {
    return { equiposIguales: true };
  }
  return null;
}
