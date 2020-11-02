import {Component, Input, OnInit} from '@angular/core';
import {House} from "../../../models/House";

@Component({
  selector: 'app-supplier-base',
  templateUrl: './supplier-base.component.html',
  styleUrls: ['./supplier-base.component.scss']
})
export class SupplierBaseComponent implements OnInit {

  @Input()
  house: House;

  constructor() { }

  ngOnInit(): void {
  }

}
