import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EquiposTestModule } from '../../../test.module';
import { AsignacionComponent } from 'app/entities/asignacion/asignacion.component';
import { AsignacionService } from 'app/entities/asignacion/asignacion.service';
import { Asignacion } from 'app/shared/model/asignacion.model';

describe('Component Tests', () => {
  describe('Asignacion Management Component', () => {
    let comp: AsignacionComponent;
    let fixture: ComponentFixture<AsignacionComponent>;
    let service: AsignacionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EquiposTestModule],
        declarations: [AsignacionComponent],
      })
        .overrideTemplate(AsignacionComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AsignacionComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AsignacionService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Asignacion(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.asignacions && comp.asignacions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
