import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent implements OnInit, OnChanges {
  @Input()
  city: string;
  data = {};

  constructor(private http: HttpClient) { }

  getWeather(city) {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=99ce29fbba502bbfa7c327a81a4b102d`;

    this.http.get(url).subscribe(weather => {
      const temp = Math.round(this.kelvinToCelsius(weather.main.temp));
      const humidity = weather.main.humidity;
      const description = weather.weather[0].description;

      this.data = {temp, humidity, description};
    });
  }

  kelvinToCelsius(kelvin) {
    return kelvin - 272.15;
  }

  ngOnChanges() {
    this.getWeather(this.city);
  }

  ngOnInit() {
  }

}
