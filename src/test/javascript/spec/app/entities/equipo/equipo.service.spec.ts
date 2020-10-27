import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EquipoService } from 'app/entities/equipo/equipo.service';
import { IEquipo, Equipo } from 'app/shared/model/equipo.model';
import { Clase } from 'app/shared/model/enumerations/clase.model';
import { Estado } from 'app/shared/model/enumerations/estado.model';
import { UEB } from 'app/shared/model/enumerations/ueb.model';

describe('Service Tests', () => {
  describe('Equipo Service', () => {
    let injector: TestBed;
    let service: EquipoService;
    let httpMock: HttpTestingController;
    let elemDefault: IEquipo;
    let expectedResult: IEquipo | IEquipo[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(EquipoService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new Equipo(0, 'AAAAAAA', Clase.Ligero, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', Estado.BUENO, 0, UEB.PROYECTO);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Equipo', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new Equipo()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Equipo', () => {
        const returnedFromService = Object.assign(
          {
            chapilla: 'BBBBBB',
            clase: 'BBBBBB',
            modelo: 'BBBBBB',
            codigo: 'BBBBBB',
            chapa: 'BBBBBB',
            estado: 'BBBBBB',
            anno: 1,
            ueb: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Equipo', () => {
        const returnedFromService = Object.assign(
          {
            chapilla: 'BBBBBB',
            clase: 'BBBBBB',
            modelo: 'BBBBBB',
            codigo: 'BBBBBB',
            chapa: 'BBBBBB',
            estado: 'BBBBBB',
            anno: 1,
            ueb: 'BBBBBB',
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

      it('should delete a Equipo', () => {
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
