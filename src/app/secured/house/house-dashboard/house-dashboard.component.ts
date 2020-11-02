import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {HouseDataService} from '../house-data.service';
import {House} from '../../../models/House';
import {map, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-house-dashboard',
  templateUrl: './house-dashboard.component.html',
  styleUrls: ['./house-dashboard.component.scss']
})
export class HouseDashboardComponent implements OnInit {

  selected = new FormControl();
  houses: House[];
  selectedIndex: number;

  constructor(private actRoute: ActivatedRoute,
              private router: Router,
              private houseDataService: HouseDataService) {
  }

  ngOnInit(): void {
    this.houses = this.houseDataService.housesDS.houses;
    this.actRoute.paramMap.subscribe(
      (params: ParamMap) => {
        this.selectedIndex = +params.get('index');
      }
    );

  }

  selectedIndexChange(index: number) {
    this.selected.patchValue(index);
  }
}
