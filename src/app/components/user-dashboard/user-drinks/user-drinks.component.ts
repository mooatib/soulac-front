import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Drink } from 'src/app/models/drink/drink.model';
import { Page } from 'src/app/models/page.model';
import { Soulacais } from 'src/app/models/soulacais/soulacais.models';
import { DrinkService } from 'src/app/services/drink/drink.service';

@Component({
  selector: 'app-user-drinks',
  templateUrl: './user-drinks.component.html',
  styleUrls: ['./user-drinks.component.scss'],
})
export class UserDrinksComponent implements OnInit {
  @Input() loggedSoulacais: Soulacais;
  page = new Page();
  drinks: Drink[];
  isLoading = false;
  totalDrinks: number = 0;
  constructor(private service: DrinkService) {}

  ngOnInit(): void {
    if (this.loggedSoulacais) {
      this.getDrinks();
      this.getDrinksCount();
    }
  }
  getDrinks(): void {
    this.isLoading = true;
    this.service
      .getDrinkByUserId(this.loggedSoulacais.id, this.page)
      .subscribe({
        next: (result) => {
          this.drinks = result;
          this.isLoading = false;
        },
      });
  }
  getDrinksCount(): void {
    this.service.getDrinksCount(this.loggedSoulacais.id).subscribe({
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

  applySearchFilter(event: Event) {
    this.page.nbr = 0;
    this.page.search = (event.target as HTMLInputElement).value;
    this.ngOnInit();
  }
}
