import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Konto } from 'src/app/domain/konto.model';
import { AuszahlungKontenService } from 'src/app/services/auszahlung-konten.service';

@Component({
  selector: 'app-auszahlung-konten',
  templateUrl: './auszahlung-konten.component.html',
  styleUrls: ['./auszahlung-konten.component.css']
})
export class AuszahlungKontenComponent implements OnInit {
  isFormOpen = false;
  auszahlungKontenForm: FormGroup;

  konten: Konto[] = [];
  messages: string[];

  constructor(private fb: FormBuilder, private auszahlungKontenService: AuszahlungKontenService) { }

  ngOnInit() {
    this.auszahlungKontenForm = this.fb.group({
      id: [undefined, []],
      name: [undefined, []],
      kontoart: [undefined, []],
      bic: [undefined, [Validators.required, Validators.minLength(8)]],
      iban: [undefined, [Validators.required, Validators.minLength(24)]],
      kontonummer: [undefined, [Validators.required]]
    });
  }

  openAddForm(): void {
    this.isFormOpen = !this.isFormOpen;
  }

  save(): void {
    const konto = this.auszahlungKontenForm.getRawValue();
    this.auszahlungKontenService.save(konto).subscribe(response => {
      this.konten = [...this.konten, response];
      this.messages = ['Account saved'];
    }, error => {
      this.messages = [error.message];
    });
  }
}
