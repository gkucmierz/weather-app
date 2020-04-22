import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, mergeMap } from 'rxjs/operators';

const apiToken = '99ce29fbba502bbfa7c327a81a4b102d';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getDetails(city) {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiToken}`;
    return this.http.get(url);
  }

  getForecast(city) {
    return this.getDetails(city).pipe(
      mergeMap((data: any) => {
        const url = `https://samples.openweathermap.org/data/2.5/forecast?id=${data.id}&appid=${apiToken}`;
        return this.http.get(url);
      })
    );
  }

  getShort(city) {
    return this.getDetails(city).pipe(
      map((weather: any) => {
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
