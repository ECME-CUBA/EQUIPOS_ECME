import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'equipo',
        loadChildren: () => import('./equipo/equipo.module').then(m => m.EquiposEquipoModule),
      },
      {
        path: 'recurso',
        loadChildren: () => import('./recurso/recurso.module').then(m => m.EquiposRecursoModule),
      },
      {
        path: 'asignacion',
        loadChildren: () => import('./asignacion/asignacion.module').then(m => m.EquiposAsignacionModule),
      },
      {
        path: 'chofer',
        loadChildren: () => import('./chofer/chofer.module').then(m => m.EquiposChoferModule),
      },
      {
        path: 'marca',
        loadChildren: () => import('./marca/marca.module').then(m => m.EquiposMarcaModule),
      },
      {
        path: 'motor',
        loadChildren: () => import('./motor/motor.module').then(m => m.EquiposMotorModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EquiposEntityModule {}
