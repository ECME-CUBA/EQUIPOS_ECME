import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IChofer, Chofer } from 'app/shared/model/chofer.model';
import { ChoferService } from './chofer.service';

@Component({
  selector: 'jhi-chofer-update',
  templateUrl: './chofer-update.component.html',
})
export class ChoferUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nombre: [],
    licencia: [],
  });

  constructor(protected choferService: ChoferService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ chofer }) => {
      this.updateForm(chofer);
    });
  }

  updateForm(chofer: IChofer): void {
    this.editForm.patchValue({
      id: chofer.id,
      nombre: chofer.nombre,
      licencia: chofer.licencia,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const chofer = this.createFromForm();
    if (chofer.id !== undefined) {
      this.subscribeToSaveResponse(this.choferService.update(chofer));
    } else {
      this.subscribeToSaveResponse(this.choferService.create(chofer));
    }
  }

  private createFromForm(): IChofer {
    return {
      ...new Chofer(),
      id: this.editForm.get(['id'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
      licencia: this.editForm.get(['licencia'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IChofer>>): void {
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
