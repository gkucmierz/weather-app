import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { API_TOKEN } from '../config';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor(private http: HttpClient) { }

  locate() {
    return Observable.create(observer => {
      navigator.geolocation.getCurrentPosition(loc => {
        observer.next(loc);
        observer.complete();
      });
    }).pipe(
      mergeMap(loc => {
        const lat = loc.coords.latitude;
        const lon = loc.coords.longitude;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_TOKEN}`;

        return this.http.get(url).pipe(map(data => {
          return data.name;
        }))
      })
    );
  }
  
}
