import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuardService} from '../../shared/services/auth/auth-guard.service';
import {HouseDashboardComponent} from './house-dashboard/house-dashboard.component';
import {HouseOverviewComponent} from './overview/overview.component';
import {SubDepositManagementComponent} from "./sub-deposit-management/sub-deposit-management.component";
import {AnalyticsBodyComponent} from "./analytics-body/analytics-body.component";
import {CustomerBaseComponent} from "./customer-base/customer-base.component";
import {SupplierBaseComponent} from "./supplier-base/supplier-base.component";
import {PayOfficeComponent} from "./pay-office/pay-office.component";
import {MainMetersComponent} from "./main-meters/main-meters.component";
import {MailBodyComponent} from "./mail-body/mail-body.component";
import {AlbeteGroupComponent} from "./albete-group/albete-group.component";

const routes: Routes = [
  {
    path: 'house/:id/details',
    children: [
      {path: 'overview', component: HouseOverviewComponent},
      {path: 'sub-deposit-management', component: SubDepositManagementComponent},
      {path: 'analytics-body', component: AnalyticsBodyComponent},
      {path: 'customer-base', component: CustomerBaseComponent},
      {path: 'supplier-base', component: SupplierBaseComponent},
      {path: 'pay-office', component: PayOfficeComponent},
      {path: 'main-meters', component: MainMetersComponent},
      {path: 'mail-body', component: MailBodyComponent},
      {path: 'albete-group', component: AlbeteGroupComponent}
      ], component: HouseDashboardComponent, canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HouseRoutingModule {
}
