import {Component, Input, OnInit} from '@angular/core';
import {House} from "../../../models/House";

@Component({
  selector: 'app-pay-office',
  templateUrl: './pay-office.component.html',
  styleUrls: ['./pay-office.component.scss']
})
export class PayOfficeComponent implements OnInit {

  @Input()
  house: House;

  constructor() { }

  ngOnInit(): void {
  }

}
