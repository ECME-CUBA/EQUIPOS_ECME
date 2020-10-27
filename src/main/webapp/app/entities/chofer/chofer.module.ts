import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EquiposSharedModule } from 'app/shared/shared.module';
import { ChoferComponent } from './chofer.component';
import { ChoferDetailComponent } from './chofer-detail.component';
import { ChoferUpdateComponent } from './chofer-update.component';
import { ChoferDeleteDialogComponent } from './chofer-delete-dialog.component';
import { choferRoute } from './chofer.route';

@NgModule({
  imports: [EquiposSharedModule, RouterModule.forChild(choferRoute)],
  declarations: [ChoferComponent, ChoferDetailComponent, ChoferUpdateComponent, ChoferDeleteDialogComponent],
  entryComponents: [ChoferDeleteDialogComponent],
})
export class EquiposChoferModule {}
