import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IChofer } from 'app/shared/model/chofer.model';
import { ChoferService } from './chofer.service';

@Component({
  templateUrl: './chofer-delete-dialog.component.html',
})
export class ChoferDeleteDialogComponent {
  chofer?: IChofer;

  constructor(protected choferService: ChoferService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.choferService.delete(id).subscribe(() => {
      this.eventManager.broadcast('choferListModification');
      this.activeModal.close();
    });
  }
}
