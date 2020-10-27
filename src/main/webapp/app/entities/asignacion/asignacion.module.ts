import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EquiposSharedModule } from 'app/shared/shared.module';
import { AsignacionComponent } from './asignacion.component';
import { AsignacionDetailComponent } from './asignacion-detail.component';
import { AsignacionUpdateComponent } from './asignacion-update.component';
import { AsignacionDeleteDialogComponent } from './asignacion-delete-dialog.component';
import { asignacionRoute } from './asignacion.route';

@NgModule({
  imports: [EquiposSharedModule, RouterModule.forChild(asignacionRoute)],
  declarations: [AsignacionComponent, AsignacionDetailComponent, AsignacionUpdateComponent, AsignacionDeleteDialogComponent],
  entryComponents: [AsignacionDeleteDialogComponent],
})
export class EquiposAsignacionModule {}
