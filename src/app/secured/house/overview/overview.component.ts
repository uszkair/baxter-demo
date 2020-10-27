import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {House} from '../../../models/House';
import {HouseService} from '../house.service';
import {HouseDataService} from "../house-data.service";

@Component({
  selector: 'app-house-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class HouseOverviewComponent implements OnInit {

  houseDTO: House;

  constructor(private actRoute: ActivatedRoute,
              private houseDataService: HouseDataService) {
  }

  ngOnInit(): void {

  }
}
