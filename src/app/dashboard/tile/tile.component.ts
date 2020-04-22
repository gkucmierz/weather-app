import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { Router } from '@angular/router';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent implements OnInit, OnChanges {
  @Input()
  city: string;
  data = {};

  constructor(
    private weather: WeatherService,
    private router: Router,
    private utils: UtilsService) { }

  ngOnChanges() {
    this.weather.getShort(this.city).subscribe(data => this.data = data);
  }

  redirect(city) {
    this.utils.urlNormalize(city).then(url => this.router.navigate(['/city', url]));
  }

  ngOnInit() {
  }

}
