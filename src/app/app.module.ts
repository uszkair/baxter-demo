import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, forwardRef, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import {FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {AdminComponent} from './secured/admin/admin.component';
import {AuthInterceptor} from './shared/interceptors/auth-interceptor';
import {DashboardComponent} from './secured/dashboard/dashboard.component';
import {BasicHttpInterceptor} from './shared/interceptors/basic-http.interceptor';
import { LeftSideNavComponent } from './secured/left-side-nav/left-side-nav.component';
import { HouseListComponent } from './secured/house-list/house-list.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { NewHouseComponent } from './secured/new-house/new-house.component';
import {MatStepperModule} from '@angular/material/stepper';
import {TextMaskModule} from 'angular2-text-mask';
import {MatCheckboxModule} from "@angular/material/checkbox";
import { TaxNumComponent } from './shared/tax-num/tax-num.component';
import {MatFormFieldControl} from "@angular/material/form-field";
import { BankAccountComponent } from './shared/bank-account/bank-account.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    AdminComponent,
    DashboardComponent,
    LeftSideNavComponent,
    HouseListComponent,
    NewHouseComponent,
    TaxNumComponent,
    BankAccountComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatOptionModule,
    MatDialogModule,
    MatStepperModule,
    TextMaskModule,
    MatCheckboxModule,
    MatProgressSpinnerModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BasicHttpInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
