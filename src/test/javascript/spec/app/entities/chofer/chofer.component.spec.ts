import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EquiposTestModule } from '../../../test.module';
import { ChoferComponent } from 'app/entities/chofer/chofer.component';
import { ChoferService } from 'app/entities/chofer/chofer.service';
import { Chofer } from 'app/shared/model/chofer.model';

describe('Component Tests', () => {
  describe('Chofer Management Component', () => {
    let comp: ChoferComponent;
    let fixture: ComponentFixture<ChoferComponent>;
    let service: ChoferService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EquiposTestModule],
        declarations: [ChoferComponent],
      })
        .overrideTemplate(ChoferComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ChoferComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ChoferService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Chofer(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.chofers && comp.chofers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
