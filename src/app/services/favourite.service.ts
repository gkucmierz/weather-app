import { Injectable } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {
  cities = [];

  constructor(private localStorage: LocalStorage) {
    this.getCities().subscribe();
  }

  addCity(city) {
    if (!this.cities.includes(city)) {
      this.cities.push(city); 
    }
    this.saveCities();
  }

  toggleCity(city) {
    if (!this.cities.includes(city)) {
      this.cities.push(city);
    } else {
      this.cities.splice(this.cities.indexOf(city), 1);
    }
    this.saveCities();
  }

  saveCities() {
    this.localStorage.setItem('cities', JSON.stringify(this.cities)).subscribe(() => {});
  }

  includes(city) {
    return this.cities.includes(city);
  }

  getCities() {
    return this.localStorage.getItem('cities').pipe(
      map(citiesJson => {
        try {
          const cities = JSON.parse(citiesJson);
          return Array.isArray(cities) && cities || [];
        } catch(e) {
          return [];
        }
      }),
      map(cities => this.cities = cities)
    );
  }

}
