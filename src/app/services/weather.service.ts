import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getDetails(city) {
    const token = '99ce29fbba502bbfa7c327a81a4b102d';
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${token}`;

    return this.http.get(url);
  }

  getShort(city) {
    return this.getDetails(city).pipe(
      map(weather => {
        const temp = Math.round(this.kelvinToCelsius(weather.main.temp));
        const humidity = weather.main.humidity;
        const description = weather.weather[0].description;

        return {temp, humidity, description};
      })
    );
  }

  kelvinToCelsius(kelvin) {
    return kelvin - 272.15;
  }

}
