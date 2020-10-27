import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAsignacion } from 'app/shared/model/asignacion.model';
import { AsignacionService } from './asignacion.service';

@Component({
  templateUrl: './asignacion-delete-dialog.component.html',
})
export class AsignacionDeleteDialogComponent {
  asignacion?: IAsignacion;

  constructor(
    protected asignacionService: AsignacionService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.asignacionService.delete(id).subscribe(() => {
      this.eventManager.broadcast('asignacionListModification');
      this.activeModal.close();
    });
  }
}
