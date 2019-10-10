import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { WeatherService } from './services/weather.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.modules';
//import { AddCityDialog } from './app.component';
import { CitiesComponent } from './cities/cities.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { CityweatherComponent } from './cities/city/cityweather/cityweather.component';
import { AppRoutingModule } from './routing.module';
import { AddCityComponent } from './cities/city/add-city/add-city.component';

@NgModule({
  declarations: [
    AppComponent,
    //AddCityDialog,
    CitiesComponent,
    ErrorPageComponent,
    CityweatherComponent,
    AddCityComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    MaterialModule,
    FlexLayoutModule, 
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [ WeatherService ],
  bootstrap: [ AppComponent ],
  //entryComponents: [AppComponent, AddCityDialog]
})
export class AppModule { }
