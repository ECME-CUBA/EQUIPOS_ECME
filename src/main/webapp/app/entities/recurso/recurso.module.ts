import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EquiposSharedModule } from 'app/shared/shared.module';
import { RecursoComponent } from './recurso.component';
import { RecursoDetailComponent } from './recurso-detail.component';
import { RecursoUpdateComponent } from './recurso-update.component';
import { RecursoDeleteDialogComponent } from './recurso-delete-dialog.component';
import { recursoRoute } from './recurso.route';

@NgModule({
  imports: [EquiposSharedModule, RouterModule.forChild(recursoRoute)],
  declarations: [RecursoComponent, RecursoDetailComponent, RecursoUpdateComponent, RecursoDeleteDialogComponent],
  entryComponents: [RecursoDeleteDialogComponent],
})
export class EquiposRecursoModule {}
