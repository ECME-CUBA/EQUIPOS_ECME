import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IAsignacion } from 'app/shared/model/asignacion.model';

type EntityResponseType = HttpResponse<IAsignacion>;
type EntityArrayResponseType = HttpResponse<IAsignacion[]>;

@Injectable({ providedIn: 'root' })
export class AsignacionService {
  public resourceUrl = SERVER_API_URL + 'api/asignacions';

  constructor(protected http: HttpClient) {}

  create(asignacion: IAsignacion): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(asignacion);
    return this.http
      .post<IAsignacion>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(asignacion: IAsignacion): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(asignacion);
    return this.http
      .put<IAsignacion>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IAsignacion>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IAsignacion[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(asignacion: IAsignacion): IAsignacion {
    const copy: IAsignacion = Object.assign({}, asignacion, {
      fecha: asignacion.fecha && asignacion.fecha.isValid() ? asignacion.fecha.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fecha = res.body.fecha ? moment(res.body.fecha) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((asignacion: IAsignacion) => {
        asignacion.fecha = asignacion.fecha ? moment(asignacion.fecha) : undefined;
      });
    }
    return res;
  }
}
