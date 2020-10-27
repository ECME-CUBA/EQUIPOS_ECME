import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IMotor, Motor } from 'app/shared/model/motor.model';
import { MotorService } from './motor.service';
import { MotorComponent } from './motor.component';
import { MotorDetailComponent } from './motor-detail.component';
import { MotorUpdateComponent } from './motor-update.component';

@Injectable({ providedIn: 'root' })
export class MotorResolve implements Resolve<IMotor> {
  constructor(private service: MotorService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMotor> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((motor: HttpResponse<Motor>) => {
          if (motor.body) {
            return of(motor.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Motor());
  }
}

export const motorRoute: Routes = [
  {
    path: '',
    component: MotorComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'equiposApp.motor.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: MotorDetailComponent,
    resolve: {
      motor: MotorResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'equiposApp.motor.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: MotorUpdateComponent,
    resolve: {
      motor: MotorResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'equiposApp.motor.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: MotorUpdateComponent,
    resolve: {
      motor: MotorResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'equiposApp.motor.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
