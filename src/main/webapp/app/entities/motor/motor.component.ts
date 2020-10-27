import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IMotor } from 'app/shared/model/motor.model';
import { MotorService } from './motor.service';
import { MotorDeleteDialogComponent } from './motor-delete-dialog.component';

@Component({
  selector: 'jhi-motor',
  templateUrl: './motor.component.html',
})
export class MotorComponent implements OnInit, OnDestroy {
  motors?: IMotor[];
  eventSubscriber?: Subscription;

  constructor(protected motorService: MotorService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.motorService.query().subscribe((res: HttpResponse<IMotor[]>) => (this.motors = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInMotors();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IMotor): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInMotors(): void {
    this.eventSubscriber = this.eventManager.subscribe('motorListModification', () => this.loadAll());
  }

  delete(motor: IMotor): void {
    const modalRef = this.modalService.open(MotorDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.motor = motor;
  }
}
