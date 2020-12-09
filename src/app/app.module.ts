import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FunctionalTestingModule } from './functional-testing/functional-testing.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FunctionalTestingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
