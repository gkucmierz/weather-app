import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { normalize } from 'normalize-diacritics';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  cities = [];
  matchedCities = [];
  searchString = '';

  constructor(private http: HttpClient) {

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
      .slice(0, 100)
      .map(([_, city]) => city);

    this.matchedCities = matched;
  }

}

