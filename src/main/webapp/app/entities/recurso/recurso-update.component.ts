import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IRecurso, Recurso } from 'app/shared/model/recurso.model';
import { RecursoService } from './recurso.service';

@Component({
  selector: 'jhi-recurso-update',
  templateUrl: './recurso-update.component.html',
})
export class RecursoUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nombre: [],
    um: [],
    tipo: [],
  });

  constructor(protected recursoService: RecursoService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ recurso }) => {
      this.updateForm(recurso);
    });
  }

  updateForm(recurso: IRecurso): void {
    this.editForm.patchValue({
      id: recurso.id,
      nombre: recurso.nombre,
      um: recurso.um,
      tipo: recurso.tipo,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const recurso = this.createFromForm();
    if (recurso.id !== undefined) {
      this.subscribeToSaveResponse(this.recursoService.update(recurso));
    } else {
      this.subscribeToSaveResponse(this.recursoService.create(recurso));
    }
  }

  private createFromForm(): IRecurso {
    return {
      ...new Recurso(),
      id: this.editForm.get(['id'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
      um: this.editForm.get(['um'])!.value,
      tipo: this.editForm.get(['tipo'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRecurso>>): void {
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
}
