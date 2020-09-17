import { Component, OnInit } from '@angular/core';
import {DashboardService} from './dashboard.service';
import {Observable} from 'rxjs/index';
import {House} from '../../models/House';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  result: Observable<House[]>;

  constructor(public dashboardService: DashboardService) { }

  ngOnInit() {
    this.result = this.dashboardService.loadAllHouses;
  }

}
