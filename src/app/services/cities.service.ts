import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {
  cities = [];

  constructor(
    private http: HttpClient,
    private utils: UtilsService) { }

  getCities() {
    return this.http.get('./assets/world-cities.json').pipe(
      map((cities: any) => {
        return this.cities = cities.map(([original, normalized]) => {
          if (normalized) {
            return [normalized.toLowerCase(), original];
          }
          return [original.toLowerCase(), original];
        });
      })
    );
  }

  matchCity(urlCity) {
    return this.getCities().pipe(
      map(cities => {
        return cities.filter(([normalized, city]) => {
          return this.utils.syncUrlNormalize(normalized) === urlCity;
        })[0];
      })
    );
  }
    
}
