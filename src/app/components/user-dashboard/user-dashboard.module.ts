import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MaterialModule } from 'src/app/material.module';
import { DrinkListModule } from '../drink/drink-list/drink-list.module';
import { UserDashboardComponent } from './user-dashboard.component';
import { UserDrinksComponent } from './user-drinks/user-drinks.component';
import { UserGroupsComponent } from './user-groups/user-groups.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { UserStatsComponent } from './user-stats/user-stats.component';

const depedencies = [
  UserDashboardComponent,
  UserInfoComponent,
  UserDrinksComponent,
  UserStatsComponent,
  UserGroupsComponent,
];

@NgModule({
  declarations: [...depedencies],
  imports: [AppRoutingModule, CommonModule, MaterialModule, DrinkListModule],
  exports: [...depedencies],
})
export class UserDashboardModule {}
