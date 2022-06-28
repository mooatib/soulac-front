import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { LoginFormComponent } from './components/auth/login-form/login-form.component';
import { RequestInterceptor } from './interceptors/request.interceptor';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RegisterFormComponent } from './components/auth/register-form/register-form.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { UserInfoComponent } from './components/user-dashboard/user-info/user-info.component';
import { MatIconModule } from '@angular/material/icon';
import { UserSettingsComponent } from './components/user-settings/user-settings.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {
  MatSnackBarModule,
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
} from '@angular/material/snack-bar';
import { UserDrinksComponent } from './components/user-dashboard/user-drinks/user-drinks.component';
import { UserStatsComponent } from './components/user-dashboard/user-stats/user-stats.component';
import { UserGroupsComponent } from './components/user-dashboard/user-groups/user-groups.component';
import { DrinkListComponent } from './components/drink/drink-list/drink-list.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { DrinkFormComponent } from './components/drink/drink-form/drink-form.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { MtxDatetimepickerModule } from '@ng-matero/extensions/datetimepicker';
import { MtxNativeDatetimeModule } from '@ng-matero/extensions/core';
import { GroupDashboardComponent } from './components/group-dashboard/group-dashboard.component';
import { GroupInfoComponent } from './components/group-dashboard/group-info/group-info.component';
import { GroupDrinksComponent } from './components/group-dashboard/group-drinks/group-drinks.component';
import { GroupUsersComponent } from './components/group-dashboard/group-users/group-users.component';
import { GroupStatsComponent } from './components/group-dashboard/group-stats/group-stats.component';
import { DrinkButtonComponent } from './components/drink/drink-button/drink-button.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginFormComponent,
    RegisterFormComponent,
    UserDashboardComponent,
    UserInfoComponent,
    UserSettingsComponent,
    UserDrinksComponent,
    UserStatsComponent,
    UserGroupsComponent,
    DrinkListComponent,
    DrinkFormComponent,
    GroupDashboardComponent,
    GroupInfoComponent,
    GroupDrinksComponent,
    GroupUsersComponent,
    GroupStatsComponent,
    DrinkButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatSidenavModule,
    MatDialogModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatPaginatorModule,
    MatTableModule,
    MatSliderModule,
    MatSelectModule,
    MatDatepickerModule,
    NgxSliderModule,
    MtxDatetimepickerModule,
    MtxNativeDatetimeModule,
    MatButtonToggleModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
