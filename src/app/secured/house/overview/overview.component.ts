import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {House} from '../../../models/House';
import {HouseService} from '../house.service';
import {switchMap} from 'rxjs/internal/operators';

@Component({
  selector: 'app-house-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class HouseOverviewComponent implements OnInit {

  houseDTO: House;

  constructor(private actRoute: ActivatedRoute,
              private houseService: HouseService) {
  }

  ngOnInit(): void {
    this.actRoute.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.houseService.getHouseByUUID(params.get('uuid')))
    ).subscribe(house => {
      this.houseDTO = house;
    });
  }

}
