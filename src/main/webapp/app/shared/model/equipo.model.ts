import { IMotor } from 'app/shared/model/motor.model';
import { IChofer } from 'app/shared/model/chofer.model';
import { IMarca } from 'app/shared/model/marca.model';
import { Clase } from 'app/shared/model/enumerations/clase.model';
import { Estado } from 'app/shared/model/enumerations/estado.model';
import { UEB } from 'app/shared/model/enumerations/ueb.model';

export interface IEquipo {
  id?: number;
  chapilla?: string;
  clase?: Clase;
  modelo?: string;
  codigo?: string;
  chapa?: string;
  estado?: Estado;
  anno?: number;
  ueb?: UEB;
  motor?: IMotor;
  cofer?: IChofer;
  marca?: IMarca;
}

export class Equipo implements IEquipo {
  constructor(
    public id?: number,
    public chapilla?: string,
    public clase?: Clase,
    public modelo?: string,
    public codigo?: string,
    public chapa?: string,
    public estado?: Estado,
    public anno?: number,
    public ueb?: UEB,
    public motor?: IMotor,
    public cofer?: IChofer,
    public marca?: IMarca
  ) {}
}
