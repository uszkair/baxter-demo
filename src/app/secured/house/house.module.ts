import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {NavSideComponent} from './house-nav-side/house-nav-side.component';
import {HouseOverviewComponent} from './overview/overview.component';
import {HouseDashboardComponent} from './house-dashboard/house-dashboard.component';
import {NewHouseComponent} from './new-house/new-house.component';
import {HouseListComponent} from './house-list/house-list.component';
import {HouseRoutingModule} from './house-routing.module';
import {MasterDataComponent} from './master-data/master-data.component';
import {AnalyticsBodyComponent} from './analytics-body/analytics-body.component';
import {SubDepositManagementComponent} from './sub-deposit-management/sub-deposit-management.component';
import {CustomerBaseComponent} from './customer-base/customer-base.component';
import {SupplierBaseComponent} from './supplier-base/supplier-base.component';
import {PayOfficeComponent} from './pay-office/pay-office.component';
import {ObjectiveToolComponent} from './objective-tool/objective-tool.component';
import {MainMetersComponent} from './main-meters/main-meters.component';
import {MailBodyComponent} from './mail-body/mail-body.component';
import {AlbeteGroupComponent} from './albete-group/albete-group.component';


@NgModule({
  declarations: [
    NavSideComponent,
    HouseListComponent,
    NewHouseComponent,
    HouseDashboardComponent,
    HouseOverviewComponent,
    MasterDataComponent,
    AnalyticsBodyComponent,
    SubDepositManagementComponent,
    CustomerBaseComponent,
    SupplierBaseComponent,
    PayOfficeComponent,
    ObjectiveToolComponent,
    MainMetersComponent,
    MailBodyComponent,
    AlbeteGroupComponent],
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
