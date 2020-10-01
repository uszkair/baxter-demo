import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuardService} from '../../shared/services/auth/auth-guard.service';
import {HouseDashboardComponent} from './house-dashboard/house-dashboard.component';
import {HouseOverviewComponent} from './overview/overview.component';

const routes: Routes = [
  { path: 'overview', component: HouseOverviewComponent, outlet: 'sidebar' , canActivate: [ AuthGuardService ] },
  { path: 'house/:id/details', component: HouseDashboardComponent, canActivate: [AuthGuardService] },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HouseRoutingModule { }
