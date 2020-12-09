import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuszahlungKontenComponent } from './auszahlung-konten/auszahlung-konten.component';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AuszahlungKontenComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
  ],
  exports: [
    AuszahlungKontenComponent
  ]
})
export class FunctionalTestingModule { }
