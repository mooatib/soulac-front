import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Drink, DrinkFlat } from 'src/app/models/drink/drink.model';
import { Page } from 'src/app/models/page.model';

@Component({
  selector: 'app-drink-list',
  templateUrl: './drink-list.component.html',
  styleUrls: ['./drink-list.component.scss'],
})
export class DrinkListComponent implements OnInit {
  constructor() {}

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() drinks: Drink[];
  @Input() totalDrinks: number;

  page: Page = new Page();
  data: DrinkFlat[];
  displayedColumns: string[] = [];

  ngOnInit(): void {
    if (this.drinks[0].soulacais) {
      this.groupDrinksMapper(this.drinks);
    } else {
      this.userDrinksMapper(this.drinks);
    }
    this.displayedColumns = Object.keys(this.data[0]);
    this.displayedColumns.shift();
  }

  userDrinksMapper(drinks: Drink[]) {
    let drinksFlatten: DrinkFlat[] = [];
    drinks.forEach((drink) => {
      let drinkFlatten: DrinkFlat = {
        id: drink.id,
        alcoholName: drink.alcohol.name,
        alcoholType: drink.alcohol.type,
        quantity: drink.quantity,
        date: drink.date,
      };
      drinksFlatten.push(drinkFlatten);
    });
    this.data = drinksFlatten;
  }
  groupDrinksMapper(drinks: Drink[]) {
    let drinksFlatten: DrinkFlat[] = [];
    drinks.forEach((drink) => {
      let drinkFlatten: DrinkFlat = {
        id: drink.id,
        soulacaisImg: drink.soulacais.img,
        alcoholName: drink.alcohol.name,
        alcoholType: drink.alcohol.type,
        quantity: drink.quantity,
        date: drink.date,
      };
      drinksFlatten.push(drinkFlatten);
    });
    this.data = drinksFlatten;
  }
  isImg(column: string) {
    return column.includes('Img');
  }
  isDate(column: string) {
    return column.includes('date');
  }
}
