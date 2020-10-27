import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { EquiposTestModule } from '../../../test.module';
import { ChoferUpdateComponent } from 'app/entities/chofer/chofer-update.component';
import { ChoferService } from 'app/entities/chofer/chofer.service';
import { Chofer } from 'app/shared/model/chofer.model';

describe('Component Tests', () => {
  describe('Chofer Management Update Component', () => {
    let comp: ChoferUpdateComponent;
    let fixture: ComponentFixture<ChoferUpdateComponent>;
    let service: ChoferService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EquiposTestModule],
        declarations: [ChoferUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ChoferUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ChoferUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ChoferService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Chofer(123);
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
        const entity = new Chofer();
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
