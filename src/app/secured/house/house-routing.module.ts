import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuardService} from '../../shared/services/auth/auth-guard.service';
import {HouseDashboardComponent} from './house-dashboard/house-dashboard.component';
import {HouseOverviewComponent} from './overview/overview.component';
import {MasterDataComponent} from "./master-data/master-data.component";

const routes: Routes = [
  {
    path: 'house/:id/details',
    children: [
      {path: 'overview', component: HouseOverviewComponent},
      {path: 'master-data', component: MasterDataComponent}], component: HouseDashboardComponent, canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HouseRoutingModule {
}
