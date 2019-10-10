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
  
  model = new Weather("Singapore",0,0,0,"", 0,0);
  selectedCountry: {countryName: string, city: string};
  imageUrl = "https://www.nea.gov.sg/assets/images/map/base-853.png";
  WEATHER_API_KEY = "476e23fe1116f4e69d2a3e68672604e1";

  constructor(private weatherSvc: WeatherService, private route: ActivatedRoute, private router: Router) { 
  }

  ngOnInit() {
    let id = +this.route.snapshot.params['id'];
    this.selectedCountry = this.weatherSvc.getCountry(id);
    this.model = this.getWeatherFromAPI(this.selectedCountry.city);
    this.imageUrl = this.weatherSvc.getImageForCountry(this.selectedCountry.city);

    //To load data values for display when first enter route
    // this.weatherSvc.getWeather(this.selectedCountry.city, this.weatherSvc.WEATHER_API_KEY)
    //   .then(result => {
    //     console.log(result);
    //     //Set default values so that there will not be error when browser renders,
    //     //but not all values have been obtained due to latency, etc.
    //     this.model = new Weather(this.selectedCountry.city, 
    //       result.main.temp, 
    //       result.main.pressure, 
    //       result.main.humidity,
    //       result.weather[0].description,
    //       result.wind.deg || 'N/A',
    //       result.wind.speed,) 
    //   }).catch(error => {
    //     console.log(error);
    // });

    this.route.params.subscribe(
      (params: Params) => {
        this.selectedCountry = this.weatherSvc.getCountry(+params['id']);
        this.model = this.getWeatherFromAPI(this.selectedCountry.city);
        this.imageUrl = this.weatherSvc.getImageForCountry(this.selectedCountry.city);
      }
    );
  }

  onReturn(){
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  getWeatherFromAPI(city: string){
    Object.keys(this.weatherSvc.imgMapBasedCity).find(value=>{
      if(this.weatherSvc.imgMapBasedCity[value].city === city){
        this.imageUrl = this.weatherSvc.imgMapBasedCity[value].imageUrl;
      }
    })
    this.weatherSvc.getWeather(city, this.WEATHER_API_KEY).then((result)=>{
      this.model = new Weather(this.model.cityName, result.main.temp,result.main.pressure,result.main.humidity,result.weather[0].description,result.wind.deg,result.wind.speed);
    }).catch((error)=>{
      console.log(error);
    })
    return this.model;
  }
}
