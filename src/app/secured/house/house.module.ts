import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {NavSideComponent} from './nav-side/nav-side.component';
import {HouseOverviewComponent} from './overview/overview.component';
import {HouseDashboardComponent} from './house-dashboard/house-dashboard.component';
import {NewHouseComponent} from './new-house/new-house.component';
import {HouseListComponent} from './house-list/house-list.component';
import {HouseRoutingModule} from './house-routing.module';


@NgModule({
  declarations: [
    NavSideComponent,
    HouseListComponent,
    NewHouseComponent,
    HouseDashboardComponent,
    HouseOverviewComponent],
  imports: [
    HouseRoutingModule,
    SharedModule
  ],
  exports: [
    NavSideComponent,
    HouseListComponent,
    NewHouseComponent,
    HouseDashboardComponent,
    HouseOverviewComponent
  ]
})
export class HouseModule {
}
