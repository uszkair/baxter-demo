import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AuthGuardService} from './shared/services/auth/auth-guard.service';
import {AdminComponent} from './secured/admin/admin.component';
import {DashboardComponent} from "./secured/dashboard/dashboard.component";
import {HouseDashboardComponent} from "./shared/house-dashboard/house-dashboard.component";


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent, canActivate: [ AuthGuardService ] },
  { path: 'house/:id/details', component: HouseDashboardComponent, canActivate: [AuthGuardService] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [ AuthGuardService ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
