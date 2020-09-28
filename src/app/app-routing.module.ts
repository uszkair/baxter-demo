import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AuthGuardService} from './shared/services/auth/auth-guard.service';
import {AdminComponent} from './secured/admin/admin.component';
import {DashboardComponent} from './secured/dashboard/dashboard.component';
import {HouseDashboardComponent} from './secured/house/house-dashboard/house-dashboard.component';
import {HouseOverviewComponent} from './secured/house/overview/overview.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent, canActivate: [ AuthGuardService ] },
  { path: 'overview', component: HouseOverviewComponent, outlet: 'sidebar' , canActivate: [ AuthGuardService ] },
  { path: 'house/:id/details', component: HouseDashboardComponent, canActivate: [AuthGuardService] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [ AuthGuardService ] },
  { path: 'shared', loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
