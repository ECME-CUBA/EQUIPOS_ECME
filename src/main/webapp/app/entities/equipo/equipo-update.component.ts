import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IEquipo, Equipo } from 'app/shared/model/equipo.model';
import { EquipoService } from './equipo.service';
import { IMotor } from 'app/shared/model/motor.model';
import { MotorService } from 'app/entities/motor/motor.service';
import { IChofer } from 'app/shared/model/chofer.model';
import { ChoferService } from 'app/entities/chofer/chofer.service';
import { IMarca } from 'app/shared/model/marca.model';
import { MarcaService } from 'app/entities/marca/marca.service';

type SelectableEntity = IMotor | IChofer | IMarca;

@Component({
  selector: 'jhi-equipo-update',
  templateUrl: './equipo-update.component.html',
})
export class EquipoUpdateComponent implements OnInit {
  isSaving = false;
  motors: IMotor[] = [];
  cofers: IChofer[] = [];
  marcas: IMarca[] = [];

  editForm = this.fb.group({
    id: [],
    chapilla: [null, []],
    clase: [],
    modelo: [],
    codigo: [null, []],
    chapa: [null, []],
    estado: [],
    anno: [],
    ueb: [],
    motor: [],
    cofer: [],
    marca: [],
  });

  constructor(
    protected equipoService: EquipoService,
    protected motorService: MotorService,
    protected choferService: ChoferService,
    protected marcaService: MarcaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ equipo }) => {
      this.updateForm(equipo);

      this.motorService
        .query({ filter: 'equipo-is-null' })
        .pipe(
          map((res: HttpResponse<IMotor[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IMotor[]) => {
          if (!equipo.motor || !equipo.motor.id) {
            this.motors = resBody;
          } else {
            this.motorService
              .find(equipo.motor.id)
              .pipe(
                map((subRes: HttpResponse<IMotor>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IMotor[]) => (this.motors = concatRes));
          }
        });

      this.choferService
        .query({ filter: 'equipo-is-null' })
        .pipe(
          map((res: HttpResponse<IChofer[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IChofer[]) => {
          if (!equipo.cofer || !equipo.cofer.id) {
            this.cofers = resBody;
          } else {
            this.choferService
              .find(equipo.cofer.id)
              .pipe(
                map((subRes: HttpResponse<IChofer>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IChofer[]) => (this.cofers = concatRes));
          }
        });

      this.marcaService
        .query({ filter: 'equipo-is-null' })
        .pipe(
          map((res: HttpResponse<IMarca[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IMarca[]) => {
          if (!equipo.marca || !equipo.marca.id) {
            this.marcas = resBody;
          } else {
            this.marcaService
              .find(equipo.marca.id)
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

  updateForm(equipo: IEquipo): void {
    this.editForm.patchValue({
      id: equipo.id,
      chapilla: equipo.chapilla,
      clase: equipo.clase,
      modelo: equipo.modelo,
      codigo: equipo.codigo,
      chapa: equipo.chapa,
      estado: equipo.estado,
      anno: equipo.anno,
      ueb: equipo.ueb,
      motor: equipo.motor,
      cofer: equipo.cofer,
      marca: equipo.marca,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const equipo = this.createFromForm();
    if (equipo.id !== undefined) {
      this.subscribeToSaveResponse(this.equipoService.update(equipo));
    } else {
      this.subscribeToSaveResponse(this.equipoService.create(equipo));
    }
  }

  private createFromForm(): IEquipo {
    return {
      ...new Equipo(),
      id: this.editForm.get(['id'])!.value,
      chapilla: this.editForm.get(['chapilla'])!.value,
      clase: this.editForm.get(['clase'])!.value,
      modelo: this.editForm.get(['modelo'])!.value,
      codigo: this.editForm.get(['codigo'])!.value,
      chapa: this.editForm.get(['chapa'])!.value,
      estado: this.editForm.get(['estado'])!.value,
      anno: this.editForm.get(['anno'])!.value,
      ueb: this.editForm.get(['ueb'])!.value,
      motor: this.editForm.get(['motor'])!.value,
      cofer: this.editForm.get(['cofer'])!.value,
      marca: this.editForm.get(['marca'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEquipo>>): void {
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
