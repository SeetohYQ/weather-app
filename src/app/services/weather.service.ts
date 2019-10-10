import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Weather } from '../models/weather';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  model = new Weather("Singapore",0,0,0,"", 0,0);
  WEATHER_API_KEY = "476e23fe1116f4e69d2a3e68672604e1";
  imageUrl = "https://www.nea.gov.sg/assets/images/map/base-853.png";
  
  countries = [
    {countryName: 'China', city: 'Beijing'},
    {countryName: 'India', city: 'New Delhi'},
    {countryName: 'Malaysia', city: 'Kuala Lumpur'},
    {countryName: 'Singapore', city: 'Singapore'}
  ]

  imgMapBasedCity = [
    {city: 'Singapore', imageUrl: 'https://www.nea.gov.sg/assets/images/map/base-853.png'},
    {city: 'Kuala Lumpur', imageUrl: 'https://www.researchgate.net/profile/Wee_Boon_Siong/publication/283298104/figure/fig1/AS:614058734673920@1523414419040/Location-of-sampling-site-at-the-Klang-Valley-Source.png'},
    {city: 'Beijing', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Beijing_in_China_%28%2Ball_claims_hatched%29.svg/1200px-Beijing_in_China_%28%2Ball_claims_hatched%29.svg.png'},
    {city: 'New Delhi', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Location_map_India_Delhi_EN.svg/1200px-Location_map_India_Delhi_EN.svg.png'}
  ]

  constructor(private httpSvc: HttpClient) { }

  getImageForCountry(city: string){
    for (let cityImage of this.imgMapBasedCity){
      if (cityImage['city'] === city){
        return cityImage['imageUrl'];
      }
    }
  }

  getCountries() {
    return this.countries.slice();
  }

  getWeather(city: string, apiKey: string): Promise<any>{
    const params = new HttpParams()
      .set("q", city)
      .set("appid", apiKey);

    return this.httpSvc.get(environment.api_url,{params: params})
      .toPromise();
  }
  
  getCountry(index: number){
    return this.countries[index];
  }

  addCity(country: {countryName: string, city: string}, imgUrl: string) {
    this.countries.push(country);
    this.countries.sort((a, b) => (a.countryName > b.countryName) ? 1 : -1)
    
    if (!this.imgMapBasedCity[country.city]){
      this.imgMapBasedCity.push({city: country.city, imageUrl: imgUrl });
    }
  }
  
  getWeatherFromAPI(city: string){
    Object.keys(this.imgMapBasedCity).find(value=>{
      if(this.imgMapBasedCity[value].city === city){
        this.imageUrl = this.imgMapBasedCity[value].imageUrl;
      }
    })
    this.getWeather(city, this.WEATHER_API_KEY).then((result)=>{
      this.model.cityName = city;
      this.model.temp = result.main.temp;
      this.model.pressure = result.main.pressure;
      this.model.humidity =  result.main.humidity;
      this.model.description =  result.weather[0].description;
      this.model.windDegree = result.wind.deg || 'NA';
      this.model.windSpeed = result.wind.speed;
      //this.model = new Weather(city,result.main.temp,result.main.pressure,result.main.humidity,result.weather[0].description,result.wind.deg,result.wind.speed);
    }).catch((error)=>{
      console.log(error);
    })
    return this.model;
  }
  
}
