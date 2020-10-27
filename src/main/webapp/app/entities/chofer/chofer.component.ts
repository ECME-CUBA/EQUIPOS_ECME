import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IChofer } from 'app/shared/model/chofer.model';
import { ChoferService } from './chofer.service';
import { ChoferDeleteDialogComponent } from './chofer-delete-dialog.component';

@Component({
  selector: 'jhi-chofer',
  templateUrl: './chofer.component.html',
})
export class ChoferComponent implements OnInit, OnDestroy {
  chofers?: IChofer[];
  eventSubscriber?: Subscription;

  constructor(protected choferService: ChoferService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.choferService.query().subscribe((res: HttpResponse<IChofer[]>) => (this.chofers = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInChofers();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IChofer): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInChofers(): void {
    this.eventSubscriber = this.eventManager.subscribe('choferListModification', () => this.loadAll());
  }

  delete(chofer: IChofer): void {
    const modalRef = this.modalService.open(ChoferDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.chofer = chofer;
  }
}
