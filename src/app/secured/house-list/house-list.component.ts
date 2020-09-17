import {Component, OnInit} from '@angular/core';
import {HouseListService} from './house-list.service';
import {House} from "../../models/House";
import {MatTableDataSource} from "@angular/material";

@Component({
  selector: 'app-house-list',
  templateUrl: './house-list.component.html',
  styleUrls: ['./house-list.component.scss']
})
export class HouseListComponent implements OnInit {
  public displayedColumns = ['name'];
  public dataSource = new MatTableDataSource<any>();

  constructor(private houseService: HouseListService) {
  }

  ngOnInit() {
    console.log('KAKI')
    this.loadHouses();
  }

  loadHouses() {
    this.houseService.getData()
      .subscribe(houses => {
        console.log('CICA', houses)
        this.dataSource.data = houses as House[];
      });
  }
}
