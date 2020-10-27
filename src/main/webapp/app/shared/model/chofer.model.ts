import { IAsignacion } from 'app/shared/model/asignacion.model';
import { Licencia } from 'app/shared/model/enumerations/licencia.model';

export interface IChofer {
  id?: number;
  nombre?: string;
  licencia?: Licencia;
  asignacions?: IAsignacion[];
}

export class Chofer implements IChofer {
  constructor(public id?: number, public nombre?: string, public licencia?: Licencia, public asignacions?: IAsignacion[]) {}
}
