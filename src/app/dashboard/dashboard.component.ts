import { Component, OnDestroy } from '@angular/core';
import { FavouriteService } from '../services/favourite.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnDestroy {
  private subs = new SubSink();
  favourites = [];

  constructor(private favourite: FavouriteService) {
    this.subs.sink = this.favourite.getCities().subscribe(favourites => {
      this.favourites = favourites;
    });
  }

  OnDestroy() {
    this.subs.unsubscribe();
  }

}
