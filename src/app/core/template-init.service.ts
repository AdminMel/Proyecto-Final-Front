import { Injectable, NgZone } from '@angular/core';

declare global {
  interface Window {
    dlabSettings?: any;
  }
}

@Injectable({ providedIn: 'root' })
export class TemplateInitService {
  constructor(private zone: NgZone) {}

  init() {
    // Corre fuera de Angular para no causar ciclos raros
    this.zone.runOutsideAngular(() => {
      setTimeout(() => {
        // Muchos templates se inicializan solos con dlabnav-init.js
        // Aquí solo forzamos un reflow/ejecución si hiciera falta.
        // Si tuvieras funciones globales específicas, las llamarías aquí.
        // Ej: (window as any).dzSettings?.init?.();
      }, 50);
    });
  }
}
