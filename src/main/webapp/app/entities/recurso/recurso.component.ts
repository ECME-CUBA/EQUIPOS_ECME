import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IRecurso } from 'app/shared/model/recurso.model';
import { RecursoService } from './recurso.service';
import { RecursoDeleteDialogComponent } from './recurso-delete-dialog.component';

@Component({
  selector: 'jhi-recurso',
  templateUrl: './recurso.component.html',
})
export class RecursoComponent implements OnInit, OnDestroy {
  recursos?: IRecurso[];
  eventSubscriber?: Subscription;

  constructor(protected recursoService: RecursoService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.recursoService.query().subscribe((res: HttpResponse<IRecurso[]>) => (this.recursos = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInRecursos();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IRecurso): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInRecursos(): void {
    this.eventSubscriber = this.eventManager.subscribe('recursoListModification', () => this.loadAll());
  }

  delete(recurso: IRecurso): void {
    const modalRef = this.modalService.open(RecursoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.recurso = recurso;
  }
}
