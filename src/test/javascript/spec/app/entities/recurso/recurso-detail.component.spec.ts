import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EquiposTestModule } from '../../../test.module';
import { RecursoDetailComponent } from 'app/entities/recurso/recurso-detail.component';
import { Recurso } from 'app/shared/model/recurso.model';

describe('Component Tests', () => {
  describe('Recurso Management Detail Component', () => {
    let comp: RecursoDetailComponent;
    let fixture: ComponentFixture<RecursoDetailComponent>;
    const route = ({ data: of({ recurso: new Recurso(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EquiposTestModule],
        declarations: [RecursoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(RecursoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RecursoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load recurso on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.recurso).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
