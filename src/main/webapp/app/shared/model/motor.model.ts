import { IMarca } from 'app/shared/model/marca.model';
import { Estado } from 'app/shared/model/enumerations/estado.model';

export interface IMotor {
  id?: number;
  codigo?: string;
  estado?: Estado;
  marca?: string;
  marca?: IMarca;
}

export class Motor implements IMotor {
  constructor(public id?: number, public codigo?: string, public estado?: Estado, public marca?: string, public marca?: IMarca) {}
}
