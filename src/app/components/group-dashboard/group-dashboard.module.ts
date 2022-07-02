import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MaterialModule } from 'src/app/material.module';
import { DrinkListModule } from '../drink/drink-list/drink-list.module';
import { GroupDashboardComponent } from './group-dashboard.component';
import { GroupDrinksComponent } from './group-drinks/group-drinks.component';
import { GroupInfoComponent } from './group-info/group-info.component';
import { GroupStatsComponent } from './group-stats/group-stats.component';
import { GroupUsersComponent } from './group-users/group-users.component';

@NgModule({
  declarations: [
    GroupDashboardComponent,
    GroupInfoComponent,
    GroupDrinksComponent,
    GroupUsersComponent,
    GroupStatsComponent,
  ],
  exports: [
    CommonModule,
    GroupDashboardComponent,
    GroupInfoComponent,
    GroupDrinksComponent,
    GroupUsersComponent,
    GroupStatsComponent,
  ],
  imports: [AppRoutingModule, CommonModule, MaterialModule, DrinkListModule],
})
export class GroupDashboardModule {}
