import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {NewHouseComponent} from '../new-house/new-house.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Router} from '@angular/router';
import {HouseDataService} from '../house-data.service';
import {map} from 'rxjs/internal/operators';

@Component({
  selector: 'app-house-list',
  templateUrl: './house-list.component.html',
  styleUrls: ['./house-list.component.scss']
})
export class HouseListComponent implements OnInit, AfterViewInit {
  public displayedColumns = ['houseName', 'postCode', 'strata', 'actions'];
  public dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router,
              private houseDataService: HouseDataService,
              public dialog: MatDialog) {
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.houseDataService.houses.pipe(
      map(data => this.dataSource.data = data),
    ).subscribe();

    this.houseDataService.loadAll();
  }

  openDialog() {
    const dialogRef = this.dialog.open(NewHouseComponent, {
      width: '100%'
    });
    // dialogRef.afterClosed().subscribe(() => {
    //   this.loadHouses();
    // });
  }

  enter(uuid){
   this.router.navigate(['house', uuid]);
  }
}
