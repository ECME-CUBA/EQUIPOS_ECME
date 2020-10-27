import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { EquiposTestModule } from '../../../test.module';
import { RecursoUpdateComponent } from 'app/entities/recurso/recurso-update.component';
import { RecursoService } from 'app/entities/recurso/recurso.service';
import { Recurso } from 'app/shared/model/recurso.model';

describe('Component Tests', () => {
  describe('Recurso Management Update Component', () => {
    let comp: RecursoUpdateComponent;
    let fixture: ComponentFixture<RecursoUpdateComponent>;
    let service: RecursoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EquiposTestModule],
        declarations: [RecursoUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(RecursoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RecursoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RecursoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Recurso(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Recurso();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
