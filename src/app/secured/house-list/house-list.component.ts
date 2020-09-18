import {Component, OnInit} from '@angular/core';
import {HouseListService} from './house-list.service';
import {House} from '../../models/House';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from "@angular/material/dialog";
import {NewHouseComponent} from "../new-house/new-house.component";

@Component({
  selector: 'app-house-list',
  templateUrl: './house-list.component.html',
  styleUrls: ['./house-list.component.scss']
})
export class HouseListComponent implements OnInit {
  public displayedColumns = ['houseName', 'postCode', 'strata'];
  public dataSource = new MatTableDataSource<any>();

  constructor(private houseService: HouseListService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.loadHouses();
  }

  loadHouses() {
    this.houseService.getData()
      .subscribe((houses: House[]) => {
        this.dataSource.data = houses;
      });
  }

  openDialog() {
    const dialogRef = this.dialog.open(NewHouseComponent, {
      width: '250px'
    });
  }
}
