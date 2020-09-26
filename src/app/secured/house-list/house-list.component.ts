import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {HouseListService} from './house-list.service';
import {House} from '../../models/House';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from "@angular/material/dialog";
import {NewHouseComponent} from "../new-house/new-house.component";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-house-list',
  templateUrl: './house-list.component.html',
  styleUrls: ['./house-list.component.scss']
})
export class HouseListComponent implements OnInit, AfterViewInit {
  public displayedColumns = ['houseName', 'postCode', 'strata'];
  public dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private houseService: HouseListService,
              public dialog: MatDialog) {
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
      width: '100%'
    });
    dialogRef.afterClosed().subscribe(() => {
      this.loadHouses();
    });
  }

}
