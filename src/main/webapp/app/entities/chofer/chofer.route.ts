import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IChofer, Chofer } from 'app/shared/model/chofer.model';
import { ChoferService } from './chofer.service';
import { ChoferComponent } from './chofer.component';
import { ChoferDetailComponent } from './chofer-detail.component';
import { ChoferUpdateComponent } from './chofer-update.component';

@Injectable({ providedIn: 'root' })
export class ChoferResolve implements Resolve<IChofer> {
  constructor(private service: ChoferService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IChofer> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((chofer: HttpResponse<Chofer>) => {
          if (chofer.body) {
            return of(chofer.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Chofer());
  }
}

export const choferRoute: Routes = [
  {
    path: '',
    component: ChoferComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'equiposApp.chofer.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ChoferDetailComponent,
    resolve: {
      chofer: ChoferResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'equiposApp.chofer.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ChoferUpdateComponent,
    resolve: {
      chofer: ChoferResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'equiposApp.chofer.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ChoferUpdateComponent,
    resolve: {
      chofer: ChoferResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'equiposApp.chofer.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
