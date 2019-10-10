import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { Weather } from '../models/weather';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {

  countries: {countryName: string, city: string}[];
  model = new Weather("Singapore",0,0,0,"", 0,0);

  constructor(private weatherSvc: WeatherService) { }

  ngOnInit() {
    this.countries = this.weatherSvc.getCountries();
  }
}
