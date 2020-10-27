import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EquiposTestModule } from '../../../test.module';
import { EquipoComponent } from 'app/entities/equipo/equipo.component';
import { EquipoService } from 'app/entities/equipo/equipo.service';
import { Equipo } from 'app/shared/model/equipo.model';

describe('Component Tests', () => {
  describe('Equipo Management Component', () => {
    let comp: EquipoComponent;
    let fixture: ComponentFixture<EquipoComponent>;
    let service: EquipoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EquiposTestModule],
        declarations: [EquipoComponent],
      })
        .overrideTemplate(EquipoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EquipoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EquipoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Equipo(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.equipos && comp.equipos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});