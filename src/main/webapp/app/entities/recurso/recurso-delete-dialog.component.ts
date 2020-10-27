import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRecurso } from 'app/shared/model/recurso.model';
import { RecursoService } from './recurso.service';

@Component({
  templateUrl: './recurso-delete-dialog.component.html',
})
export class RecursoDeleteDialogComponent {
  recurso?: IRecurso;

  constructor(protected recursoService: RecursoService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.recursoService.delete(id).subscribe(() => {
      this.eventManager.broadcast('recursoListModification');
      this.activeModal.close();
    });
  }
}
