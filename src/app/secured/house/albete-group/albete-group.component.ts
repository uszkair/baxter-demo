import {Component, Input, OnInit} from '@angular/core';
import {House} from "../../../models/House";

@Component({
  selector: 'app-albete-group',
  templateUrl: './albete-group.component.html',
  styleUrls: ['./albete-group.component.scss']
})
export class AlbeteGroupComponent implements OnInit {

  @Input()
  house: House;

  constructor() { }

  ngOnInit(): void {
  }

}
