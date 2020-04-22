import { Component, OnInit } from '@angular/core';
import { FavouriteService } from '../services/favourite.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  favourites = [];
  weatherData = new Map();

  constructor(
    private favourite: FavouriteService,
    private http: HttpClient) {
    this.favourite.getCities().subscribe(favourites => {
      this.favourites = favourites;

      favourites.map(city => {
        this.getWeather(city);
      });
    });
  }

  getWeather(city) {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=99ce29fbba502bbfa7c327a81a4b102d`;

    this.http.get(url).subscribe(weather => {
      const temp = Math.round(this.kelvinToCelsius(weather.main.temp));
      const humidity = weather.main.humidity;
      const description = weather.weather[0].description;

      this.weatherData.set(city, {temp, humidity, description});
    });
  }

  kelvinToCelsius(kelvin) {
    return kelvin - 272.15;
  }

  getCityWeather(city, param) {
    const data = this.weatherData.get(city);
    return data && data[param] || '';
  }

  ngOnInit() {
  }

}
