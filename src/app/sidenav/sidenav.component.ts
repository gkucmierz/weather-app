import { Component, OnDestroy } from '@angular/core';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
import { FavouriteService } from '../services/favourite.service';
import { Router } from '@angular/router';
import { UtilsService } from '../services/utils.service';
import { CitiesService } from '../services/cities.service';
import { SubSink } from 'subsink';
import { GeolocationService } from '../services/geolocation.service';

const MAX_VISIBLE_CITIES = 100;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnDestroy {
  private subs = new SubSink();
  visibleCity = '';
  citiesList = [];
  matchedCities = [];
  searchString = '';
  fasStar = fasStar;
  farStar = farStar;
  isGeolocated = false;
  geoLoading = false;

  constructor(
    private favourite: FavouriteService,
    private router: Router,
    private utils: UtilsService,
    private cities: CitiesService,
    private geolocation: GeolocationService) {

    this.subs.sink = this.cities.getCities().subscribe(list => {
      this.citiesList = list;
      this.showCities();
    });
  }

  onKey(event) {
    this.utils.normalizeDiacritics(event.target.value).then(str => {
      this.searchString = str.toLowerCase();
      this.showCities();
    });
    this.isGeolocated = false;
  }

  showCities() {
    const phrase = this.searchString;
    const matched = this.citiesList
      .filter(([normalized]) => normalized.includes(phrase))
      .sort((a, b) => {
        return +(b[0] === phrase) - +(a[0] === phrase);
      })
      .map(([_, city]) => city)
      .slice(0, MAX_VISIBLE_CITIES);

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

  locate() {
    this.geolocation.locate().subscribe(city => {
      this.isGeolocated = true;
      this.geoLoading = false;
      this.visibleCity = city;
      this.showCities();
    });
    this.visibleCity = '';
    this.geoLoading = true;
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
