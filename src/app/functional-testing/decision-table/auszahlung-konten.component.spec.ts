import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';
import { AuszahlungKontenService } from 'src/app/services/auszahlung-konten.service';
import { AuszahlungKontenComponent } from '../auszahlung-konten/auszahlung-konten.component';

describe('AuszahlungKontenComponent(FT/DT)', () => {
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

  const fillData = (id: string, value: string | number): void => {
    const input = fixture.debugElement.query(By.css(`#${id}`)).nativeElement;
    input.value = value;
    input.dispatchEvent(new Event('input'));
  };

  const waitChanges = () => {
    tick(); // simulates the passage of time until all pending asynchronous activities finish
    fixture.detectChanges();
  };

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Scenario 1: Should save form data', fakeAsync(() => {
    const btn = fixture.debugElement.query(By.css('#e2e-aauszahlung-konten-add'));
    btn.triggerEventHandler('click', null);
    waitChanges();

    const form = fixture.debugElement.query(By.css('#e2e-auszahlung-konten-form'));
    // form is displayed
    expect(form).toBeTruthy();
    fillData('name', 'Owner ABC');
    fillData('kontoart', 'kontoart');
    fillData('bic', 'ADD30034030340');
    fillData('iban', 'MT98MMEB44093000000009027293051');
    fillData('kontonummer', '221.764.06');
    waitChanges();

    const saved = {id: 12345};
    auszahlungKontenServiceMock.save.and.returnValue(of(saved));
    const submitBtn = fixture.debugElement.query(By.css('#e2e-auszahlung-konten-form-save'));
    submitBtn.triggerEventHandler('click', null);

    waitChanges();
    expect(component.konten).toEqual([saved]);
    const messageElt = fixture.debugElement.query(By.css('#e2e-auszahlung-konten-form-saved'));
    expect(messageElt.nativeElement.innerText).toContain('Account saved');
  }));

  it('Scenario 2: Should display error when saving an account trigger an error', fakeAsync(() => {
    const btn = fixture.debugElement.query(By.css('#e2e-aauszahlung-konten-add'));
    btn.triggerEventHandler('click', null);
    waitChanges();

    const form = fixture.debugElement.query(By.css('#e2e-auszahlung-konten-form'));
    // form is displayed
    expect(form).toBeTruthy();
    fillData('name', 'Owner ABC');
    fillData('kontoart', 'kontoart');
    fillData('bic', 'ADD30034030340');
    fillData('iban', 'MT98MMEB44093000000009027293051');
    fillData('kontonummer', '221.764.06');
    waitChanges();

    const message = 'error while saving';
    auszahlungKontenServiceMock.save.and.returnValue(throwError({message}));
    const submitBtn = fixture.debugElement.query(By.css('#e2e-auszahlung-konten-form-save'));
    submitBtn.triggerEventHandler('click', null);

    waitChanges();
    expect(component.konten).toEqual([]);
    const messageElt = fixture.debugElement.query(By.css('#e2e-auszahlung-konten-form-saved'));
    expect(messageElt.nativeElement.innerText).toContain(message);
  }));
});
