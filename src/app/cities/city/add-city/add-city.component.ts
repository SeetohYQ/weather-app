import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.css']
})
export class AddCityComponent implements OnInit {

  country: {countryName: string, city: string} = {countryName:'', city:''};
  imageUrl: string;
  form: FormGroup;
  countries: {countryName: string, city: string}[];
  cities: string[] = [];

  constructor(private weatherSvc: WeatherService, private router: Router, private route: ActivatedRoute,
              private _snackBar: MatSnackBar) { }

  ngOnInit() {

    this.countries = this.weatherSvc.getCountries();
    for (let i = 0; i< this.countries.length; i++){
      this.cities.push(this.countries[i].city);
    }

    this.form = new FormGroup({
      'city': new FormControl(null, [Validators.required, this.existingCities.bind(this)]),
      'country': new FormControl(null, Validators.required),
      'imageUrl': new FormControl(null)
    })
  }

  onAdd(){
    console.log(this.form.get('city'));
    this.country = {
      countryName: this.form.get('country').value, 
      city: this.form.get('city').value
    };
    this.imageUrl = this.form.get('imageUrl').value;
    console.log(this.country);

    this.weatherSvc.addCity(this.country, this.imageUrl);
    this._snackBar.open("Added to List", "Close", {
      duration: 2000,
    });
    this.router.navigate(['../'],{relativeTo: this.route});
  }

  //Custom validator
  existingCities(control: FormControl): {[s: string]: boolean}{
    if (this.cities.indexOf(control.value) != -1){
      return {'existingCity': true};
    }
    return null; //if validation is successful
  }

}
