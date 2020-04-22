import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherService } from '../services/weather.service';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  city = '';
  detailedWeather = {};

  constructor(
    private route: ActivatedRoute,
    private weather: WeatherService) {}

  ngOnInit() {
    this.route.params.pipe(
      mergeMap(params => {
        this.city = params['city'];
        return this.weather.getForecast(this.city);
      })
    ).subscribe(weather => {
      this.detailedWeather = weather;
    });
  }

}
