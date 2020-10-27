export interface IMarca {
  id?: number;
  marca?: string;
}

export class Marca implements IMarca {
  constructor(public id?: number, public marca?: string) {}
}
