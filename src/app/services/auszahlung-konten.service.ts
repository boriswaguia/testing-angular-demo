import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Konto } from '../domain/konto.model';

@Injectable({
  providedIn: 'root',
})
export class AuszahlungKontenService {
  constructor() {}

  save(konto: Konto): Observable<Konto> {
    if (this.hasRole()) {
      if (!konto.id) {
        konto.id = this.getRandomInt();
        konto.version = 0;
      } else {
        konto.version = konto.version + 1;
      }
    }
    return of(konto);
  }

  getRandomInt(max: number = 99999) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  hasRole(): boolean {
    return true; // stub
  }
}
