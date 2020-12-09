import { TestBed } from '@angular/core/testing';

import { AuszahlungKontenService } from './auszahlung-konten.service';

describe('AuszahlungKontenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuszahlungKontenService = TestBed.get(AuszahlungKontenService);
    expect(service).toBeTruthy();
  });
});
