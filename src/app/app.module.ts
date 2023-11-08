import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { HaloStateManagerModule, SourceOfTruthInitiate } from 'halo-state-manager';
import { ValidateFileDirective } from './directives/validate-file.directive';
import { DirectivesModule } from './directives/directives.module';


const sourceOfTruthInitiate: SourceOfTruthInitiate[] = [
  {
    key: 'FIRSTSTATE',
    state: {
      stateProperty: 'value',
    },
    stateProperties: {
      stateProperty: 'value',
    }
  }
]

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, HaloStateManagerModule.forRoot(sourceOfTruthInitiate), DirectivesModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
