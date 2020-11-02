import {Component, Input, OnInit} from '@angular/core';
import {House} from "../../../models/House";

@Component({
  selector: 'app-objective-tool',
  templateUrl: './objective-tool.component.html',
  styleUrls: ['./objective-tool.component.scss']
})
export class ObjectiveToolComponent implements OnInit {

  @Input()
  house: House;

  constructor() { }

  ngOnInit(): void {
  }

}
