import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrinkListComponent } from './drink-list.component';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  declarations: [DrinkListComponent],
  imports: [CommonModule, MaterialModule],
  exports: [DrinkListComponent],
})
export class DrinkListModule {}
