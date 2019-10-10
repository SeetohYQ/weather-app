import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private countries = [
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

}
