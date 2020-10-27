import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IEquipo } from 'app/shared/model/equipo.model';
import { EquipoService } from './equipo.service';
import { EquipoDeleteDialogComponent } from './equipo-delete-dialog.component';

@Component({
  selector: 'jhi-equipo',
  templateUrl: './equipo.component.html',
})
export class EquipoComponent implements OnInit, OnDestroy {
  equipos?: IEquipo[];
  eventSubscriber?: Subscription;

  constructor(protected equipoService: EquipoService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.equipoService.query().subscribe((res: HttpResponse<IEquipo[]>) => (this.equipos = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInEquipos();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IEquipo): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInEquipos(): void {
    this.eventSubscriber = this.eventManager.subscribe('equipoListModification', () => this.loadAll());
  }

  delete(equipo: IEquipo): void {
    const modalRef = this.modalService.open(EquipoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.equipo = equipo;
  }
}
