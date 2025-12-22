import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CompetenciasService } from '../../shared/services/competencias.service';
import { Competencia } from '../../shared/models/competencia';

@Component({
  selector: 'app-competencias-result',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './result.component.html',
  styleUrl: './result.component.css'
})
export class ResultComponent {
  id!: number;
  loading = false;
  competencia?: Competencia;

  form = this.fb.group({
    golesLocal: [0, [Validators.required, Validators.min(0)]],
    golesVisitante: [0, [Validators.required, Validators.min(0)]],
    finalizado: [true, Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private svc: CompetenciasService,
    private router: Router
  ) {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    // Si tu API tiene GET /competencias/{id} luego lo cambiamos;
    // por ahora usamos getAll y buscamos
    this.svc.getAll().subscribe({
      next: (list) => {
        this.competencia = list.find(x => x.id === this.id);
        if (this.competencia) {
          this.form.patchValue({
            golesLocal: this.competencia.golesLocal,
            golesVisitante: this.competencia.golesVisitante,
            finalizado: this.competencia.finalizado
          });
        }
      }
    });
  }

  save() {
    if (!this.competencia) return;
    if (this.form.invalid) return;

    this.loading = true;

    const body: Competencia = {
      ...this.competencia,
      golesLocal: this.form.value.golesLocal ?? 0,
      golesVisitante: this.form.value.golesVisitante ?? 0,
      finalizado: this.form.value.finalizado ?? true
    };

    this.svc.update(this.id, body).subscribe({
      next: () => { this.loading = false; this.router.navigate(['/competencias']); },
      error: () => { this.loading = false; }
    });
  }
}
