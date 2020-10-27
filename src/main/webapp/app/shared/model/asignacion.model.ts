import { Moment } from 'moment';
import { IChofer } from 'app/shared/model/chofer.model';
import { IRecurso } from 'app/shared/model/recurso.model';

export interface IAsignacion {
  id?: number;
  fecha?: Moment;
  cantidad?: number;
  chofer?: IChofer;
  recurso?: IRecurso;
}

export class Asignacion implements IAsignacion {
  constructor(public id?: number, public fecha?: Moment, public cantidad?: number, public chofer?: IChofer, public recurso?: IRecurso) {}
}
