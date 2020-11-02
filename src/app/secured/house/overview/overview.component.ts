import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, ParamMap, Router} from '@angular/router';
import {House} from '../../../models/House';
import {HouseService} from '../house.service';
import {HouseDataService} from "../house-data.service";
import {switchMap} from 'rxjs/internal/operators';
import {of} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-house-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class HouseOverviewComponent implements OnInit {

  @Input()
  house: House;
  formGroup: FormGroup;

  constructor(private houseDataService: HouseDataService,
              private formBuilder: FormBuilder,
              private actRoute: ActivatedRoute) {

    this.formGroup = this.formBuilder.group({
      shortHouseName: [null, Validators.required]
    });

  }
  ngOnInit(): void {
  }
}
