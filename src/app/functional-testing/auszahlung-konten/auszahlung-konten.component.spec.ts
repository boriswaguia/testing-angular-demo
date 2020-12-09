import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AuszahlungKontenService } from 'src/app/services/auszahlung-konten.service';

import { AuszahlungKontenComponent } from './auszahlung-konten.component';

describe('AuszahlungKontenComponent', () => {
  let component: AuszahlungKontenComponent;
  let fixture: ComponentFixture<AuszahlungKontenComponent>;
  const auszahlungKontenServiceMock: jasmine.SpyObj<AuszahlungKontenService> = jasmine.createSpyObj('AuszahlungKontenService', ['save']);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
      ],
      providers: [
        {provide: AuszahlungKontenService, useValue: auszahlungKontenServiceMock}
      ],
      declarations: [ AuszahlungKontenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuszahlungKontenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
