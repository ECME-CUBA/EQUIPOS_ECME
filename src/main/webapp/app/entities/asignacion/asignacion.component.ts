import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAsignacion } from 'app/shared/model/asignacion.model';
import { AsignacionService } from './asignacion.service';
import { AsignacionDeleteDialogComponent } from './asignacion-delete-dialog.component';

@Component({
  selector: 'jhi-asignacion',
  templateUrl: './asignacion.component.html',
})
export class AsignacionComponent implements OnInit, OnDestroy {
  asignacions?: IAsignacion[];
  eventSubscriber?: Subscription;

  constructor(protected asignacionService: AsignacionService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.asignacionService.query().subscribe((res: HttpResponse<IAsignacion[]>) => (this.asignacions = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInAsignacions();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IAsignacion): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInAsignacions(): void {
    this.eventSubscriber = this.eventManager.subscribe('asignacionListModification', () => this.loadAll());
  }

  delete(asignacion: IAsignacion): void {
    const modalRef = this.modalService.open(AsignacionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.asignacion = asignacion;
  }
}
