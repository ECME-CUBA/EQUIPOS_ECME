import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IMotor, Motor } from 'app/shared/model/motor.model';
import { MotorService } from './motor.service';
import { IMarca } from 'app/shared/model/marca.model';
import { MarcaService } from 'app/entities/marca/marca.service';

@Component({
  selector: 'jhi-motor-update',
  templateUrl: './motor-update.component.html',
})
export class MotorUpdateComponent implements OnInit {
  isSaving = false;
  marcas: IMarca[] = [];

  editForm = this.fb.group({
    id: [],
    codigo: [null, []],
    estado: [],
    marca: [],
    marca: [],
  });

  constructor(
    protected motorService: MotorService,
    protected marcaService: MarcaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ motor }) => {
      this.updateForm(motor);

      this.marcaService
        .query({ filter: 'motor-is-null' })
        .pipe(
          map((res: HttpResponse<IMarca[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IMarca[]) => {
          if (!motor.marca || !motor.marca.id) {
            this.marcas = resBody;
          } else {
            this.marcaService
              .find(motor.marca.id)
              .pipe(
                map((subRes: HttpResponse<IMarca>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IMarca[]) => (this.marcas = concatRes));
          }
        });
    });
  }

  updateForm(motor: IMotor): void {
    this.editForm.patchValue({
      id: motor.id,
      codigo: motor.codigo,
      estado: motor.estado,
      marca: motor.marca,
      marca: motor.marca,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const motor = this.createFromForm();
    if (motor.id !== undefined) {
      this.subscribeToSaveResponse(this.motorService.update(motor));
    } else {
      this.subscribeToSaveResponse(this.motorService.create(motor));
    }
  }

  private createFromForm(): IMotor {
    return {
      ...new Motor(),
      id: this.editForm.get(['id'])!.value,
      codigo: this.editForm.get(['codigo'])!.value,
      estado: this.editForm.get(['estado'])!.value,
      marca: this.editForm.get(['marca'])!.value,
      marca: this.editForm.get(['marca'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMotor>>): void {
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

  trackById(index: number, item: IMarca): any {
    return item.id;
  }
}
