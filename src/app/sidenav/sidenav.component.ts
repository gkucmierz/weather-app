import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
import { FavouriteService } from '../services/favourite.service';
import { Router } from '@angular/router';
import { UtilsService } from './../services/utils.service';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  cities = [];
  matchedCities = [];
  searchString = '';
  fasStar = fasStar;
  farStar = farStar;

  constructor(
    private http: HttpClient,
    private favourite: FavouriteService,
    private router: Router,
    private utils: UtilsService) {

    this.http.get('./assets/world-cities.json')
      .subscribe(cities => {
        this.cities = cities.map(([original, normalized]) => {
          if (normalized) {
            return [normalized.toLowerCase(), original];
          }
          return [original.toLowerCase(), original];
        })

        this.showCities();
      });
  }

  onKey(event) {
    this.utils.normalizeDiacritics(event.target.value).then(str => {
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

  toggleFav(city, event) {
    this.favourite.toggleCity(city);
    event.stopPropagation();
  }

  isFav(city) {
    return this.favourite.includes(city);
  }

  redirect(city) {
    this.utils.urlNormalize(city).then(url => this.router.navigate(['/city', url]));
  }

  ngOnInit() {
  }

}
