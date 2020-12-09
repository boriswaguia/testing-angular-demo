import { TestBed } from '@angular/core/testing';
import { Konto } from 'src/app/domain/konto.model';
import { AuszahlungKontenService } from 'src/app/services/auszahlung-konten.service';


describe('AuszahlungKontenService, White Box, Path Coverage', () => {
  let service: AuszahlungKontenService;
  beforeEach(() => TestBed.configureTestingModule({}));

  beforeEach(() => {
    service = TestBed.get(AuszahlungKontenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should not save data when user do not have role', (done: DoneFn) => {
    const konto: Konto = {
      bic: '1234',
      iban: 'iban',
      kontoart: 'kontoart',
      kontonummer: 'kontonummer',
    };
    const spy = spyOn(service, 'hasRole').and.returnValue(false);
    const result$ = service.save(konto);
    result$.subscribe(response => {
      expect(response).toEqual(konto);
      done();
    });
  });


  it('should save konto and add id on new konto', (done: DoneFn) => {
    const konto: Konto = {
      bic: '1234',
      iban: 'iban',
      kontoart: 'kontoart',
      kontonummer: 'kontonummer',
    };
    spyOn(service, 'hasRole').and.returnValue(true);
    spyOn(service, 'getRandomInt').and.returnValue(123);
    const result$ = service.save(konto);
    result$.subscribe(response => {
      expect(response).toEqual({...konto, id: 123, version: 0});
      done();
    });
  });

  it('should save konto and update version', (done: DoneFn) => {
    const konto: Konto = {
      id: 93939,
      bic: '1234',
      iban: 'iban',
      kontoart: 'kontoart',
      kontonummer: 'kontonummer',
      version: 10
    };
    spyOn(service, 'hasRole').and.returnValue(true);
    spyOn(service, 'getRandomInt').and.returnValue(123);
    const result$ = service.save(konto);
    result$.subscribe(response => {
      expect(response).toEqual({...konto, version: 11});
      done();
    });
  });
});
