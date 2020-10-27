import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EquiposTestModule } from '../../../test.module';
import { AsignacionDetailComponent } from 'app/entities/asignacion/asignacion-detail.component';
import { Asignacion } from 'app/shared/model/asignacion.model';

describe('Component Tests', () => {
  describe('Asignacion Management Detail Component', () => {
    let comp: AsignacionDetailComponent;
    let fixture: ComponentFixture<AsignacionDetailComponent>;
    const route = ({ data: of({ asignacion: new Asignacion(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EquiposTestModule],
        declarations: [AsignacionDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(AsignacionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AsignacionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load asignacion on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.asignacion).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
