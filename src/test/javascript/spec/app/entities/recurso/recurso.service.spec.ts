import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RecursoService } from 'app/entities/recurso/recurso.service';
import { IRecurso, Recurso } from 'app/shared/model/recurso.model';
import { UnidadDeMedida } from 'app/shared/model/enumerations/unidad-de-medida.model';
import { TipoRecurso } from 'app/shared/model/enumerations/tipo-recurso.model';

describe('Service Tests', () => {
  describe('Recurso Service', () => {
    let injector: TestBed;
    let service: RecursoService;
    let httpMock: HttpTestingController;
    let elemDefault: IRecurso;
    let expectedResult: IRecurso | IRecurso[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(RecursoService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new Recurso(0, 'AAAAAAA', UnidadDeMedida.Litro, TipoRecurso.Parte);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Recurso', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new Recurso()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Recurso', () => {
        const returnedFromService = Object.assign(
          {
            nombre: 'BBBBBB',
            um: 'BBBBBB',
            tipo: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Recurso', () => {
        const returnedFromService = Object.assign(
          {
            nombre: 'BBBBBB',
            um: 'BBBBBB',
            tipo: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Recurso', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
