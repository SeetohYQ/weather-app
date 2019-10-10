import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../../services/weather.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Weather } from '../../../models/weather';

@Component({
  selector: 'app-cityweather',
  templateUrl: './cityweather.component.html',
  styleUrls: ['./cityweather.component.css']
})
export class CityweatherComponent implements OnInit {
  
  model: Weather;
  selectedCountry: {countryName: string, city: string};
  imageUrl: string;

  constructor(private weatherSvc: WeatherService, private route: ActivatedRoute, private router: Router) { 
  }

  ngOnInit() {
    let id = +this.route.snapshot.params['id'];
    this.selectedCountry = this.weatherSvc.getCountry(id);
    this.model = this.weatherSvc.getWeatherFromAPI(this.selectedCountry.city);
    this.imageUrl = this.weatherSvc.getImageForCountry(this.selectedCountry.city);

    this.route.params.subscribe(
      (params: Params) => {
        this.selectedCountry = this.weatherSvc.getCountry(+params['id']);
        this.model = this.weatherSvc.getWeatherFromAPI(this.selectedCountry.city);
        this.imageUrl = this.weatherSvc.getImageForCountry(this.selectedCountry.city);
      }
    );
  }

  onReturn(){
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  // getWeatherFromAPI(city: string){
  //   Object.keys(this.weatherSvc.imgMapBasedCity).find(value=>{
  //     if(this.weatherSvc.imgMapBasedCity[value].city === city){
  //       this.imageUrl = this.weatherSvc.imgMapBasedCity[value].imageUrl;
  //     }
  //   })
  //   this.weatherSvc.getWeather(city, this.WEATHER_API_KEY).then((result)=>{
  //     this.model = new Weather(this.model.cityName, result.main.temp,result.main.pressure,result.main.humidity,result.weather[0].description,result.wind.deg,result.wind.speed);
  //   }).catch((error)=>{
  //     console.log(error);
  //   })
  //   return this.model;
  // }
}
