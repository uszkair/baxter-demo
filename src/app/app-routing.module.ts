import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {AuthGuardService} from './shared/services/auth/auth-guard.service';
import {AdminComponent} from './secured/admin/admin.component';
import {DashboardComponent} from "./secured/dashboard/dashboard.component";


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent, canActivate: [ AuthGuardService ] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [ AuthGuardService ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
