import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {
  CreateAlcoholForm,
  UpdateAlcoholForm,
} from 'src/app/models/alcohol/alcohol-form.model';
import { Alcohol } from 'src/app/models/alcohol/alcohol.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AlcoholService {
  constructor(private http: HttpClient, private router: Router) {}

  getAlcohols(skip: number, limit: number): Observable<Alcohol[]> {
    return this.http.get<Alcohol[]>(
      `${environment.soulac_api_url}` + '/alcohols' + `/${skip}&${limit}`
    );
  }

  getAlcohol(id: number): Observable<Alcohol> {
    return this.http.get<Alcohol>(
      `${environment.soulac_api_url}` + '/alcohols' + `/${id}`
    );
  }
  createAlcohol(alcohol: CreateAlcoholForm): void {
    this.http
      .post<Alcohol>(`${environment.soulac_api_url}` + '/alcohols', alcohol)
      .subscribe({
        next: (result) => {
          this.router.navigate(['/']);
        },
      });
  }
  updateAlcohol(alcohol: UpdateAlcoholForm): void {
    this.http
      .patch<Alcohol>(`${environment.soulac_api_url}` + '/alcohols', alcohol)
      .subscribe({
        next: (result) => {
          this.router.navigate(['/']);
        },
      });
  }
  deleteAlcohol(id: number): void {
    this.http.delete(`${environment.soulac_api_url}` + '/alcohols' + `/${id}`);
  }
}
