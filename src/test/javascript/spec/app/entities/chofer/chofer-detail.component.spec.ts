import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { EquiposTestModule } from '../../../test.module';
import { ChoferDetailComponent } from 'app/entities/chofer/chofer-detail.component';
import { Chofer } from 'app/shared/model/chofer.model';

describe('Component Tests', () => {
  describe('Chofer Management Detail Component', () => {
    let comp: ChoferDetailComponent;
    let fixture: ComponentFixture<ChoferDetailComponent>;
    const route = ({ data: of({ chofer: new Chofer(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [EquiposTestModule],
        declarations: [ChoferDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ChoferDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ChoferDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load chofer on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.chofer).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
