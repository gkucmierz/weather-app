import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherService } from '../services/weather.service';
import { mergeMap } from 'rxjs/operators';
import { CitiesService } from '../services/cities.service';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
import { FavouriteService } from '../services/favourite.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  urlCity = '';
  city = '';
  detailedWeather = {};
  faHome = faHome;
  fasStar = fasStar;
  farStar = farStar;

  constructor(
    private route: ActivatedRoute,
    private weather: WeatherService,
    private cities: CitiesService,
    private favourite: FavouriteService) {}

  toggleFav(city) {
    this.favourite.toggleCity(city);
  }

  isFav(city) {
    return this.favourite.includes(city);
  }

  ngOnInit() {
    this.subs.sink = this.route.params.pipe(
      mergeMap(params => {
        this.urlCity = params.city;
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

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
