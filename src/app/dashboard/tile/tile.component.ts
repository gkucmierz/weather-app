import { Component, OnDestroy, OnChanges, Input } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { Router } from '@angular/router';
import { UtilsService } from '../../services/utils.service';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { FavouriteService } from '../../services/favourite.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent implements OnDestroy, OnChanges {
  private subs = new SubSink();
  @Input()
  city: string;
  data = {};
  faTrashAlt = faTrashAlt;

  constructor(
    private weather: WeatherService,
    private router: Router,
    private utils: UtilsService,
    private favourite: FavouriteService) { }

  ngOnChanges() {
    this.subs.sink = this.weather.getShort(this.city).subscribe(data => this.data = data);
  }

  redirect(city) {
    this.utils.urlNormalize(city).then(url => this.router.navigate(['/city', url]));
  }

  removeFav(city, event) {
    this.favourite.toggleCity(city);
    event.stopPropagation();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
