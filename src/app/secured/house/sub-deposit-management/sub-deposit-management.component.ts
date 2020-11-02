import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {House} from "../../../models/House";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {HouseDataService} from "../house-data.service";
import {MatDialog} from "@angular/material/dialog";
import {NewHouseComponent} from "../new-house/new-house.component";
import {SubDepositManagementService} from "./sub-deposit-management.service";

/*
 * Albetét kezelés
 */
@Component({
  selector: 'app-sub-deposit-management',
  templateUrl: './sub-deposit-management.component.html',
  styleUrls: ['./sub-deposit-management.component.scss']
})
export class SubDepositManagementComponent implements OnInit, AfterViewInit {
  public displayedColumns = ['code', 'owner', 'floor', 'createNew'];
  public dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Input()
  house: House;

  constructor(public dialog: MatDialog, private subDepositService: SubDepositManagementService) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  ngOnInit(): void {
  }

  createNew(element: any) {

  }

}
