import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { normalize } from 'normalize-diacritics';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
import { FavouriteService } from './services/favourite.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  cities = [];
  matchedCities = [];
  searchString = '';
  fasStar = fasStar;
  farStar = farStar;

  constructor(
    private http: HttpClient,
    private favourite: FavouriteService) {

    this.http.get('./assets/world-cities.json')
      .subscribe(cities => {
        this.cities = cities.map(([normalized, original]) => {
          if (original) {
            return [normalized.toLowerCase(), original];
          }
          return [normalized.toLowerCase(), normalized];
        })

        this.showCities();
      });
  }

  onKey(event) {
    normalize(event.target.value).then(str => {
      this.searchString = str.toLowerCase();
      this.showCities();
    });
  }

  showCities() {
    const matched = this.cities
      .filter(([normalized]) => normalized.includes(this.searchString))
      .map(([_, city]) => city)
      .slice(0, 100);

    this.matchedCities = matched;
  }

  toggleFav(city) {
    this.favourite.toggleCity(city);
  }

  isFav(city) {
    return this.favourite.includes(city);
  }

}

