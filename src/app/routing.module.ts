import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router';
import { CitiesComponent } from './cities/cities.component';
import { CityweatherComponent } from './cities/city/cityweather/cityweather.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { AddCityComponent } from './cities/city/add-city/add-city.component';

const appRoutes: Routes = [
    { path: '', component: CitiesComponent},
    { path: 'cities', component: CitiesComponent},
    { path: 'cities/add', component: AddCityComponent},
    { path: 'cities/:id', component: CityweatherComponent },
    { path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found!'} },
    { path: '**', redirectTo:'not-found'} //wildcare route: catch all paths which are not known. This should be the last route in the array of routes.
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes) //Register the routes
    ], 
    exports: [RouterModule] //What is accessible to the module importing this module.
})
export class AppRoutingModule {

}