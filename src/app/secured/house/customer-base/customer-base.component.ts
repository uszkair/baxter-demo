import {Component, Input, OnInit} from '@angular/core';
import {House} from "../../../models/House";

@Component({
  selector: 'app-customer-base',
  templateUrl: './customer-base.component.html',
  styleUrls: ['./customer-base.component.scss']
})
export class CustomerBaseComponent implements OnInit {

  @Input()
  house: House;
  constructor() { }

  ngOnInit(): void {
  }

}
