import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherService } from '../services/weather.service';
import { mergeMap } from 'rxjs/operators';
import { CitiesService } from '../services/cities.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  urlCity = '';
  city = '';
  detailedWeather = {};

  constructor(
    private route: ActivatedRoute,
    private weather: WeatherService,
    private cities: CitiesService) {}

  ngOnInit() {
    this.route.params.pipe(
      mergeMap(params => {
        this.urlCity = params['city'];
        return this.cities.matchCity(this.urlCity).pipe(
          mergeMap(([normalized, city]) => {
            this.city = city;
            return this.weather.getDetails(city);
          })
        );
      })
    ).subscribe(weather => {
      this.detailedWeather = weather;
    });
  }

}
