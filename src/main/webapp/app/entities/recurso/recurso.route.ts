import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IRecurso, Recurso } from 'app/shared/model/recurso.model';
import { RecursoService } from './recurso.service';
import { RecursoComponent } from './recurso.component';
import { RecursoDetailComponent } from './recurso-detail.component';
import { RecursoUpdateComponent } from './recurso-update.component';

@Injectable({ providedIn: 'root' })
export class RecursoResolve implements Resolve<IRecurso> {
  constructor(private service: RecursoService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRecurso> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((recurso: HttpResponse<Recurso>) => {
          if (recurso.body) {
            return of(recurso.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Recurso());
  }
}

export const recursoRoute: Routes = [
  {
    path: '',
    component: RecursoComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'equiposApp.recurso.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: RecursoDetailComponent,
    resolve: {
      recurso: RecursoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'equiposApp.recurso.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: RecursoUpdateComponent,
    resolve: {
      recurso: RecursoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'equiposApp.recurso.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: RecursoUpdateComponent,
    resolve: {
      recurso: RecursoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'equiposApp.recurso.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
