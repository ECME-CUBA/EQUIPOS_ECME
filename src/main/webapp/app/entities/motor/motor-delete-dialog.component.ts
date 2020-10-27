import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMotor } from 'app/shared/model/motor.model';
import { MotorService } from './motor.service';

@Component({
  templateUrl: './motor-delete-dialog.component.html',
})
export class MotorDeleteDialogComponent {
  motor?: IMotor;

  constructor(protected motorService: MotorService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.motorService.delete(id).subscribe(() => {
      this.eventManager.broadcast('motorListModification');
      this.activeModal.close();
    });
  }
}
