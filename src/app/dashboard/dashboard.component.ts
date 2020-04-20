import { Component, OnInit } from '@angular/core';
import { FavouriteService } from '../services/favourite.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  favourites = [];

  constructor(private favourite: FavouriteService) {
    this.favourite.getCities().subscribe(favourites => {
      this.favourites = favourites;
    });
  }

  ngOnInit() {
  }

}
