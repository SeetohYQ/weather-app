import { Component, OnInit, Inject } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { Weather } from './models/weather';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { City } from './models/city';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'weather-app';
  //WEATHER_API_KEY = "476e23fe1116f4e69d2a3e68672604e1";
  //model: Weather = new Weather("Singapore", 0, 0, 0, "", 0, 0);
  //imageUrl = "https://www.nea.gov.sg/assets/images/map/base-853.png";
  //city: string;
  //country: string;
  //imageurl: string;
  //countries: { countryName: string, city: string }[];

  // imgMapBasedCity = [
  //   {city: 'Singapore', imageUrl: 'https://www.nea.gov.sg/assets/images/map/base-853.png'},
  //   {city: 'Kuala Lumpur', imageUrl: 'https://www.researchgate.net/profile/Wee_Boon_Siong/publication/283298104/figure/fig1/AS:614058734673920@1523414419040/Location-of-sampling-site-at-the-Klang-Valley-Source.png'},
  //   {city: 'Beijing', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Beijing_in_China_%28%2Ball_claims_hatched%29.svg/1200px-Beijing_in_China_%28%2Ball_claims_hatched%29.svg.png'},
  //   {city: 'New Delhi', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Location_map_India_Delhi_EN.svg/1200px-Location_map_India_Delhi_EN.svg.png'}
  // ]
  // constructor(private weatherSvc: WeatherService,
  //   public dialog: MatDialog){}

  constructor(private weatherSvc: WeatherService) { }

  ngOnInit() {
    //this.getWeatherFromAPI(this.model.cityName);
    //this.countries = this.weatherSvc.getCountries();
  }

  // getWeatherFromAPI(city: string){
  //   Object.keys(this.imgMapBasedCity).find(value=>{
  //     if(this.imgMapBasedCity[value].city === city){
  //       this.imageUrl = this.imgMapBasedCity[value].imageUrl;
  //     }
  //   })
  //   this.weatherSvc.getWeather(city, this.WEATHER_API_KEY).then((result)=>{
  //     this.model = new Weather(this.model.cityName, result.main.temp,result.main.pressure,result.main.humidity,result.weather[0].description,result.wind.deg,result.wind.speed);
  //   }).catch((error)=>{
  //     console.log(error);
  //   })
  // }

  //   addCity(): void {

  //     const dialogRef = this.dialog.open(AddCityDialog, {
  //       width: '250px',
  //       data: {city: this.city, country: this.country, imageurl: this.imageurl}
  //     });

  //     dialogRef.afterClosed().subscribe((result) => {
  //       if(typeof result !== 'undefined'){
  //         this.countries.push({countryName: result.country, city: result.city });
  //         this.countries.sort((a, b) => (a.countryName > b.countryName) ? 1 : -1)
  //         this.imgMapBasedCity.push({city: result.city, imageUrl: result.imageurl });
  //       }
  //     });
  //   }
  // }

  // @Component({
  //   selector: 'add-city',
  //   templateUrl: 'addcity.html',
  // })
  // export class AddCityDialog {

  //   constructor(
  //     public dialogRef: MatDialogRef<AddCityDialog>,
  //     @Inject(MAT_DIALOG_DATA) public data: City) {}

  //   onNoClick(): void {
  //     this.dialogRef.close();
  //   }

}

