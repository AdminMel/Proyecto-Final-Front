export interface Jugador {
  id?: number;
  nombre: string;
  edad: number;
  posicion: string;

  equipoId: number | null;
  equipoNombre?: string | null;
}
