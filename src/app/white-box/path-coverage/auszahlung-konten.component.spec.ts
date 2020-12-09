import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';
import { AuszahlungKontenComponent } from 'src/app/functional-testing/auszahlung-konten/auszahlung-konten.component';
import { AuszahlungKontenService } from 'src/app/services/auszahlung-konten.service';

describe('AuszahlungKontenComponent, Whitebox Testing, Path Coverage', () => {
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

  it('should not display the form is isFormOpen is false', () => {
    component.isFormOpen = false;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('#e2e-auszahlung-konten-form'))).toBeNull();
  });

  it('should display no message element messages list is empty of null', () => {
    component.isFormOpen = true;
    const initialState = {
      state0: {
        messages: null
      },
      state1: {
        messages: undefined
      },
      state2: {
        messages: []
      }
    };

    Object.keys(initialState).forEach(state => {
      component.messages = initialState[state].messages;
      fixture.detectChanges();

      const messageElt = fixture.debugElement.query(By.css('#e2e-auszahlung-konten-form-saved'))
      expect(messageElt).withContext(`running state ${state}`).toBeNull();
    })
  });

  it('should display messages is form is open and messages exist', () => {
    component.isFormOpen = true;
    component.messages = ['this is message1', 'this is message2'];
    fixture.detectChanges();
    const messageElt = fixture.debugElement.query(By.css('#e2e-auszahlung-konten-form-saved')).nativeElement;
    expect(messageElt.innerText).toContain('this is message1');
    expect(messageElt.innerText).toContain('this is message2');
  });

  it('should disable form submit when form is invalid', () => {
    component.isFormOpen = true;
    fixture.detectChanges();
    const submitBtn = fixture.debugElement.query(By.css('#e2e-auszahlung-konten-form-save')).nativeElement;
    expect(submitBtn.disabled).toBeTruthy();
  });


  it('should enable form submit when form is valid', () => {
    component.isFormOpen = true;

    component.auszahlungKontenForm.controls.name.setValue('ASDss');
    component.auszahlungKontenForm.controls.kontoart.setValue('kontoart');
    component.auszahlungKontenForm.controls.bic.setValue('ADD30034030340');
    component.auszahlungKontenForm.controls.iban.setValue('MT98MMEB44093000000009027293051');
    component.auszahlungKontenForm.controls.kontonummer.setValue('221.764.06');

    fixture.detectChanges();

    const submitBtn = fixture.debugElement.query(By.css('#e2e-auszahlung-konten-form-save')).nativeElement;
    expect(submitBtn.disabled).toBeFalsy();
  });

  it('save account should update accounts and messages on success', () => {
    component.auszahlungKontenForm.controls.name.setValue('ASDss');
    component.auszahlungKontenForm.controls.kontoart.setValue('kontoart');
    component.auszahlungKontenForm.controls.bic.setValue('ADD30034030340');
    component.auszahlungKontenForm.controls.iban.setValue('MT98MMEB44093000000009027293051');
    component.auszahlungKontenForm.controls.kontonummer.setValue('221.764.06');
    const saved = {id: 1234};
    auszahlungKontenServiceMock.save.and.returnValue(of(saved));
    fixture.detectChanges();
    component.save();
    expect(component.konten).toEqual([saved]);
    expect(component.messages).toEqual(['Account saved']);
  });

  it('save account should update messages on success', () => {
    component.auszahlungKontenForm.controls.name.setValue('ASDss');
    component.auszahlungKontenForm.controls.kontoart.setValue('kontoart');
    component.auszahlungKontenForm.controls.bic.setValue('ADD30034030340');
    component.auszahlungKontenForm.controls.iban.setValue('MT98MMEB44093000000009027293051');
    component.auszahlungKontenForm.controls.kontonummer.setValue('221.764.06');
    const message = 'Error while saving';
    auszahlungKontenServiceMock.save.and.returnValue(throwError(({message})));
    fixture.detectChanges();
    component.save();
    expect(component.messages).toEqual([message]);
  });

  it('should update isFormOpen', () => {
    component.isFormOpen = true;
    component.openAddForm();
    expect(component.isFormOpen).toBeFalsy();

    component.openAddForm();
    expect(component.isFormOpen).toBeTruthy();
  });

});
