import {Component, Input, OnInit} from '@angular/core';
import {House} from "../../../models/House";

@Component({
  selector: 'app-main-meters',
  templateUrl: './main-meters.component.html',
  styleUrls: ['./main-meters.component.scss']
})
export class MainMetersComponent implements OnInit {

  @Input()
  house: House;

  constructor() { }

  ngOnInit(): void {
  }

}
