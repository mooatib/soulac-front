import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {
  CreateDrinkForm,
  UpdateDrinkForm,
} from 'src/app/models/drink/drink-form.model';
import { Drink } from 'src/app/models/drink/drink.model';
import { Page } from 'src/app/models/page.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DrinkService {
  constructor(private http: HttpClient, private router: Router) {}

  getDrinkByUserId(id: number, page: Page): Observable<Drink[]> {
    const params = {
      nbr: page.nbr,
      limit: page.limit,
      orderBy: page.orderBy,
      orderByAsc: page.orderByAsc,
      search: page.search,
    };
    return this.http.get<Drink[]>(
      `${environment.soulac_api_url}` + '/drinks/user' + `/${id}`,
      { params }
    );
  }

  getDrinksCount(id: number): Observable<number> {
    return this.http.get<number>(
      `${environment.soulac_api_url}` + '/drinks/user' + `/${id}/count`
    );
  }

  getLastUserDrink(id: number): Observable<Drink> {
    return this.http.get<Drink>(
      `${environment.soulac_api_url}` + '/drinks/user' + `/${id}/last`
    );
  }
  getDrinks(): Observable<Drink> {
    return this.http.get<Drink>(`${environment.soulac_api_url}` + '/drinks');
  }
  createDrink(drink: CreateDrinkForm): void {
    this.http
      .post<Drink>(`${environment.soulac_api_url}` + '/drinks', drink)
      .subscribe({
        next: (result) => {
          this.router.navigate(['/']);
        },
      });
  }
  updateDrink(drink: UpdateDrinkForm): void {
    this.http
      .patch<Drink>(`${environment.soulac_api_url}` + '/drinks', drink)
      .subscribe({
        next: (result) => {
          this.router.navigate(['/']);
        },
      });
  }
  deleteDrink(id: number): void {
    this.http.delete(`${environment.soulac_api_url}` + '/drinks' + `/${id}`);
  }
}
