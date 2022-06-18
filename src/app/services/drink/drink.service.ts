import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {
  CreateDrinkForm,
  UpdateDrinkForm,
} from 'src/app/models/drink/drink-form.model';
import { Drink } from 'src/app/models/drink/drink.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DrinkService {
  constructor(private http: HttpClient, private router: Router) {}

  getDrinks(skip: number, limit: number): Observable<Drink[]> {
    return this.http.get<Drink[]>(
      `${environment.soulac_api_url}` + '/drinks' + `/${skip}&${limit}`
    );
  }

  getDrink(id: number): Observable<Drink> {
    return this.http.get<Drink>(
      `${environment.soulac_api_url}` + '/drinks' + `/${id}`
    );
  }
  getDrinkByUserId(id: number): Observable<Drink> {
    return this.http.get<Drink>(
      `${environment.soulac_api_url}` + '/drinks/user' + `/${id}`
    );
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
