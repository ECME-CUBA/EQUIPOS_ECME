import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EquiposSharedModule } from 'app/shared/shared.module';
import { MotorComponent } from './motor.component';
import { MotorDetailComponent } from './motor-detail.component';
import { MotorUpdateComponent } from './motor-update.component';
import { MotorDeleteDialogComponent } from './motor-delete-dialog.component';
import { motorRoute } from './motor.route';

@NgModule({
  imports: [EquiposSharedModule, RouterModule.forChild(motorRoute)],
  declarations: [MotorComponent, MotorDetailComponent, MotorUpdateComponent, MotorDeleteDialogComponent],
  entryComponents: [MotorDeleteDialogComponent],
})
export class EquiposMotorModule {}
