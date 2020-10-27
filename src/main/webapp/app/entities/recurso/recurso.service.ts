import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IRecurso } from 'app/shared/model/recurso.model';

type EntityResponseType = HttpResponse<IRecurso>;
type EntityArrayResponseType = HttpResponse<IRecurso[]>;

@Injectable({ providedIn: 'root' })
export class RecursoService {
  public resourceUrl = SERVER_API_URL + 'api/recursos';

  constructor(protected http: HttpClient) {}

  create(recurso: IRecurso): Observable<EntityResponseType> {
    return this.http.post<IRecurso>(this.resourceUrl, recurso, { observe: 'response' });
  }

  update(recurso: IRecurso): Observable<EntityResponseType> {
    return this.http.put<IRecurso>(this.resourceUrl, recurso, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRecurso>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRecurso[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
