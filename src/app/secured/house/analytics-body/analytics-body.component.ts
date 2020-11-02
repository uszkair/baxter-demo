import {Component, Input, OnInit} from '@angular/core';
import {House} from "../../../models/House";

@Component({
  selector: 'app-analytics-body',
  templateUrl: './analytics-body.component.html',
  styleUrls: ['./analytics-body.component.scss']
})
export class AnalyticsBodyComponent implements OnInit {

  @Input()
  house: House;
  constructor() { }

  ngOnInit(): void {
  }

}
