import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAsignacion } from 'app/shared/model/asignacion.model';

@Component({
  selector: 'jhi-asignacion-detail',
  templateUrl: './asignacion-detail.component.html',
})
export class AsignacionDetailComponent implements OnInit {
  asignacion: IAsignacion | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ asignacion }) => (this.asignacion = asignacion));
  }

  previousState(): void {
    window.history.back();
  }
}
