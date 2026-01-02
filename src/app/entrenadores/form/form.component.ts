import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EntrenadoresService } from '../../shared/services/entrenadores.service';

@Component({
  selector: 'app-entrenadores-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  id?: number;
  loading = false;

  form = this.fb.group({
    nombre: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private svc: EntrenadoresService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    const paramId = this.route.snapshot.paramMap.get('id');
    if (paramId) {
      this.id = +paramId;
      this.svc.getById(this.id).subscribe({
        next: (e) => this.form.patchValue({ nombre: e.nombre })
      });
    }
  }

  save() {
    if (this.form.invalid) return;
    this.loading = true;

    const body: any = { nombre: this.form.value.nombre! };
    const req = this.id ? this.svc.update(this.id, body) : this.svc.create(body);

    req.subscribe({
      next: () => { this.loading = false; this.router.navigate(['/entrenadores']); },
      error: () => { this.loading = false; }
    });
  }
}
