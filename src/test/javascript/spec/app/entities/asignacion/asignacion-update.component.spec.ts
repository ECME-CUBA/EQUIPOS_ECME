import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { EquiposTestModule } from '../../../test.module';
import { AsignacionUpdateComponent } from 'app/entities/asignacion/asignacion-update.component';
import { AsignacionService } from 'app/entities/asignacion/asignacion.service';
import { Asignacion } from 'app/shared/model/asignacion.model';

describe('Component Tests', () => {
  describe('Asignacion Management Update Component', () => {
    let comp: AsignacionUpdateComponent;
    let fixture: ComponentFixture<AsignacionUpdateComponent>;
    let service: AsignacionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EquiposTestModule],
        declarations: [AsignacionUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(AsignacionUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AsignacionUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AsignacionService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Asignacion(123);
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
        const entity = new Asignacion();
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
