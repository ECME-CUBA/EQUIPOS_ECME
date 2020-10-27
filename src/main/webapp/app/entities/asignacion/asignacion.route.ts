import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IAsignacion, Asignacion } from 'app/shared/model/asignacion.model';
import { AsignacionService } from './asignacion.service';
import { AsignacionComponent } from './asignacion.component';
import { AsignacionDetailComponent } from './asignacion-detail.component';
import { AsignacionUpdateComponent } from './asignacion-update.component';

@Injectable({ providedIn: 'root' })
export class AsignacionResolve implements Resolve<IAsignacion> {
  constructor(private service: AsignacionService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAsignacion> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((asignacion: HttpResponse<Asignacion>) => {
          if (asignacion.body) {
            return of(asignacion.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Asignacion());
  }
}

export const asignacionRoute: Routes = [
  {
    path: '',
    component: AsignacionComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'equiposApp.asignacion.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AsignacionDetailComponent,
    resolve: {
      asignacion: AsignacionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'equiposApp.asignacion.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AsignacionUpdateComponent,
    resolve: {
      asignacion: AsignacionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'equiposApp.asignacion.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AsignacionUpdateComponent,
    resolve: {
      asignacion: AsignacionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'equiposApp.asignacion.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
