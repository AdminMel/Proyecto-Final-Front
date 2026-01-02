export interface Equipo {
  id?: number;
  nombre: string;

  ligaId: number | null;
  ligaNombre?: string | null;

  entrenadorId: number | null;
  entrenadorNombre?: string | null;
}
