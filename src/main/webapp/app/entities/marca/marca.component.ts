import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IMarca } from 'app/shared/model/marca.model';
import { MarcaService } from './marca.service';
import { MarcaDeleteDialogComponent } from './marca-delete-dialog.component';

@Component({
  selector: 'jhi-marca',
  templateUrl: './marca.component.html',
})
export class MarcaComponent implements OnInit, OnDestroy {
  marcas?: IMarca[];
  eventSubscriber?: Subscription;

  constructor(protected marcaService: MarcaService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.marcaService.query().subscribe((res: HttpResponse<IMarca[]>) => (this.marcas = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInMarcas();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IMarca): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInMarcas(): void {
    this.eventSubscriber = this.eventManager.subscribe('marcaListModification', () => this.loadAll());
  }

  delete(marca: IMarca): void {
    const modalRef = this.modalService.open(MarcaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.marca = marca;
  }
}
