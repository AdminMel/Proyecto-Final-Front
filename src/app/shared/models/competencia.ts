export interface Competencia {
  id?: number;

  fecha: string; // ISO
  ligaId: number;
  ligaNombre?: string | null;

  equipoLocalId: number;
  equipoLocalNombre?: string | null;

  equipoVisitanteId: number;
  equipoVisitanteNombre?: string | null;

  golesLocal: number;
  golesVisitante: number;

  finalizado: boolean;
}
