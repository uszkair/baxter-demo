import {Component, Input, OnInit} from '@angular/core';
import {House} from "../../../models/House";

@Component({
  selector: 'app-mail-body',
  templateUrl: './mail-body.component.html',
  styleUrls: ['./mail-body.component.scss']
})
export class MailBodyComponent implements OnInit {

  @Input()
  house: House;

  constructor() { }

  ngOnInit(): void {
  }

}
