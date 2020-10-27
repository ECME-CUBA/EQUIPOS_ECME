import { IAsignacion } from 'app/shared/model/asignacion.model';
import { UnidadDeMedida } from 'app/shared/model/enumerations/unidad-de-medida.model';
import { TipoRecurso } from 'app/shared/model/enumerations/tipo-recurso.model';

export interface IRecurso {
  id?: number;
  nombre?: string;
  um?: UnidadDeMedida;
  tipo?: TipoRecurso;
  asignacions?: IAsignacion[];
}

export class Recurso implements IRecurso {
  constructor(
    public id?: number,
    public nombre?: string,
    public um?: UnidadDeMedida,
    public tipo?: TipoRecurso,
    public asignacions?: IAsignacion[]
  ) {}
}
