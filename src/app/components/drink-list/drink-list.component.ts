import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Drink, DrinkFlat } from 'src/app/models/drink/drink.model';
import { Page } from 'src/app/models/page.model';
import { DrinkService } from 'src/app/services/drink/drink.service';

@Component({
  selector: 'app-drink-list',
  templateUrl: './drink-list.component.html',
  styleUrls: ['./drink-list.component.scss'],
})
export class DrinkListComponent implements OnInit {
  constructor(private service: DrinkService) {}

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() id: number;

  page: Page = new Page();
  totalDrinks: number = 0;
  data: DrinkFlat[];
  displayedColumns: string[] = [];

  ngOnInit(): void {
    this.getDrinks();
  }

  getDrinks(): void {
    this.service.getDrinks(this.id, this.page).subscribe({
      next: (result) => {
        this.data = this.drinksMapper(result);
        this.displayedColumns = Object.keys(this.data[0]);
        this.displayedColumns.shift();
      },
    });
  }
  getDrinksCount(): void {
    this.service.getDrinksCount().subscribe({
      next: (result) => {
        this.totalDrinks = result;
      },
    });
  }

  pageChanged(event: PageEvent) {
    this.page.limit = event.pageSize;
    this.page.nbr = event.pageIndex;
    this.getDrinks();
  }

  drinksMapper(result: Drink[]): DrinkFlat[] {
    let drinksFlatten: DrinkFlat[] = [];
    result.forEach((drink) => {
      let drinkFlatten: DrinkFlat = {
        id: drink.id,
        alcoholName: drink.alcohol.name,
        alcoholType: drink.alcohol.type,
        quantity: drink.quantity,
        date: drink.date,
      };
      drinksFlatten.push(drinkFlatten);
    });
    return drinksFlatten;
  }
}
