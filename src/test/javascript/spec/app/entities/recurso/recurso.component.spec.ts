import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EquiposTestModule } from '../../../test.module';
import { RecursoComponent } from 'app/entities/recurso/recurso.component';
import { RecursoService } from 'app/entities/recurso/recurso.service';
import { Recurso } from 'app/shared/model/recurso.model';

describe('Component Tests', () => {
  describe('Recurso Management Component', () => {
    let comp: RecursoComponent;
    let fixture: ComponentFixture<RecursoComponent>;
    let service: RecursoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EquiposTestModule],
        declarations: [RecursoComponent],
      })
        .overrideTemplate(RecursoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RecursoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RecursoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Recurso(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.recursos && comp.recursos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
