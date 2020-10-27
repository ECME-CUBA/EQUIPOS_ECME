import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IAsignacion, Asignacion } from 'app/shared/model/asignacion.model';
import { AsignacionService } from './asignacion.service';
import { IChofer } from 'app/shared/model/chofer.model';
import { ChoferService } from 'app/entities/chofer/chofer.service';
import { IRecurso } from 'app/shared/model/recurso.model';
import { RecursoService } from 'app/entities/recurso/recurso.service';

type SelectableEntity = IChofer | IRecurso;

@Component({
  selector: 'jhi-asignacion-update',
  templateUrl: './asignacion-update.component.html',
})
export class AsignacionUpdateComponent implements OnInit {
  isSaving = false;
  chofers: IChofer[] = [];
  recursos: IRecurso[] = [];

  editForm = this.fb.group({
    id: [],
    fecha: [],
    cantidad: [],
    chofer: [],
    recurso: [],
  });

  constructor(
    protected asignacionService: AsignacionService,
    protected choferService: ChoferService,
    protected recursoService: RecursoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ asignacion }) => {
      if (!asignacion.id) {
        const today = moment().startOf('day');
        asignacion.fecha = today;
      }

      this.updateForm(asignacion);

      this.choferService.query().subscribe((res: HttpResponse<IChofer[]>) => (this.chofers = res.body || []));

      this.recursoService.query().subscribe((res: HttpResponse<IRecurso[]>) => (this.recursos = res.body || []));
    });
  }

  updateForm(asignacion: IAsignacion): void {
    this.editForm.patchValue({
      id: asignacion.id,
      fecha: asignacion.fecha ? asignacion.fecha.format(DATE_TIME_FORMAT) : null,
      cantidad: asignacion.cantidad,
      chofer: asignacion.chofer,
      recurso: asignacion.recurso,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const asignacion = this.createFromForm();
    if (asignacion.id !== undefined) {
      this.subscribeToSaveResponse(this.asignacionService.update(asignacion));
    } else {
      this.subscribeToSaveResponse(this.asignacionService.create(asignacion));
    }
  }

  private createFromForm(): IAsignacion {
    return {
      ...new Asignacion(),
      id: this.editForm.get(['id'])!.value,
      fecha: this.editForm.get(['fecha'])!.value ? moment(this.editForm.get(['fecha'])!.value, DATE_TIME_FORMAT) : undefined,
      cantidad: this.editForm.get(['cantidad'])!.value,
      chofer: this.editForm.get(['chofer'])!.value,
      recurso: this.editForm.get(['recurso'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAsignacion>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
