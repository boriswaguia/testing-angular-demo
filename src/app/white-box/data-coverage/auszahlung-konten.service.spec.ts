import { TestBed } from '@angular/core/testing';
import { Konto } from 'src/app/domain/konto.model';
import { AuszahlungKontenService } from 'src/app/services/auszahlung-konten.service';


describe('AuszahlungKontenService, White Box, Data Coverage', () => {
  // Do all what path coverage do, but inject some data that can break the test.
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
  it('should save account', (done: DoneFn) => {
    spyOn(service, 'hasRole').and.returnValue(true);
    spyOn(service, 'getRandomInt').and.returnValue(123);
    // Commented states, are state that can broke the normal execution of the function.
    // Let's try them by uncommenting and running them.
    // Shall we need to test such cases ?
    // Do we need to make the function complex in order to satify these possibilities ?
    const data = {
      // state0: {
      //   konto: undefined,
      //   expected: 'error'
      // },
      // state1: {
      //   konto: null,
      //   expected: 'error'
      // },
      state2: {
        konto: {},
        expected: {
          id: 123,
          version: 0
        }
      },
      state3: {
        konto: {
          bic: '1234',
          iban: 'iban',
          kontoart: 'kontoart',
          kontonummer: 'kontonummer',
        },
        expected: {
          id: 123,
          bic: '1234',
          iban: 'iban',
          kontoart: 'kontoart',
          kontonummer: 'kontonummer',
          version: 0
        }
      },
      state4: {
        konto: {
          id: 93939,
          bic: '1234',
          iban: 'iban',
          kontoart: 'kontoart',
          kontonummer: 'kontonummer',
          version: 10
        },
        expected: {
          id: 93939,
          bic: '1234',
          iban: 'iban',
          kontoart: 'kontoart',
          kontonummer: 'kontonummer',
          version: 11
        }
      },
      state5: {
        konto: {
          id: 93939,
          bic: '1234',
          iban: 'iban',
          kontoart: 'kontoart',
          kontonummer: 'kontonummer',
          version: undefined
        },
        expected: {
          id: 93939,
          bic: '1234',
          iban: 'iban',
          kontoart: 'kontoart',
          kontonummer: 'kontonummer',
          version: 11
        },
      },
    };

    Object.keys(data).forEach(state => {
      const result$ = service.save(data[state].konto);
      result$.subscribe(response => {
        expect(response).withContext(`running state ${state}`).toEqual(data[state].expected);
        done();
      });
    });
  });
});
