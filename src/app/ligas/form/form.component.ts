import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LigasService } from '../../shared/services/ligas.service';

@Component({
  selector: 'app-ligas-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  id?: number;
  loading = false;

  form = this.fb.group({
    nombre: ['', Validators.required],
    descripcion: ['']
  });

  constructor(
    private fb: FormBuilder,
    private ligasSvc: LigasService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    const paramId = this.route.snapshot.paramMap.get('id');
    if (paramId) {
      this.id = +paramId;
      this.load();
    }
  }

  load() {
    this.ligasSvc.getById(this.id!).subscribe({
      next: liga => this.form.patchValue(liga)
    });
  }

  save() {
    if (this.form.invalid) return;
    this.loading = true;

    const req = this.id
      ? this.ligasSvc.update(this.id, this.form.value as any)
      : this.ligasSvc.create(this.form.value as any);

    req.subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/ligas']);
      },
      error: () => this.loading = false
    });
  }
}
