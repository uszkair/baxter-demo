import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {HouseDataService} from "../house-data.service";

@Component({
  selector: 'app-house-dashboard',
  templateUrl: './house-dashboard.component.html',
  styleUrls: ['./house-dashboard.component.scss']
})
export class HouseDashboardComponent implements OnInit {

  selected = new FormControl(0);
  houses: any[];

  constructor(private actRoute: ActivatedRoute,
              private houseDataService: HouseDataService) {
  }

  ngOnInit(): void {

    this.houseDataService.houses.subscribe(
      data => this.houses = data
    );

    this.actRoute.paramMap.subscribe(
      (params: ParamMap) =>
        this.houseDataService.load(params.get('uuid'))
    );
  }

}

