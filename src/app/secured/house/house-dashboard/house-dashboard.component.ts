import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {switchMap} from "rxjs/internal/operators";
import {HouseService} from "../house.service";

@Component({
  selector: 'app-house-dashboard',
  templateUrl: './house-dashboard.component.html',
  styleUrls: ['./house-dashboard.component.scss']
})
export class HouseDashboardComponent implements OnInit {

  selected = new FormControl(0);

  houses;

  constructor(private actRoute: ActivatedRoute,
              private houseService: HouseService) {
  }

  ngOnInit(): void {
    this.actRoute.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.houseService.getHouseById(params.get('id')))
    ).subscribe(house => {
      this.houses = this.houseService.update(house);
    });
  }

}
