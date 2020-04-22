import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent implements OnInit, OnChanges {
  @Input()
  city: string;
  data = {};

  constructor(private weather: WeatherService) { }

  ngOnChanges() {
    this.weather.getShort(this.city).subscribe(data => this.data = data);
  }

  ngOnInit() {
  }

}
