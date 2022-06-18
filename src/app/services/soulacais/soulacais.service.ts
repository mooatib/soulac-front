import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {
  CreateSoulacaisForm,
  UpdateSoulacaisForm,
} from 'src/app/models/soulacais/soulacais-form.model';
import { Soulacais } from 'src/app/models/soulacais/soulacais.models';
import { User } from 'src/app/models/user/user.model';
import { environment } from 'src/environments/environment';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class SoulacaisService {
  SOULACAIS: string = 'soulacais';
  loggedInUser: User;
  private loggedInSoulacais: Soulacais;
  constructor(
    private router: Router,
    private http: HttpClient,
    private userService: UserService
  ) {
    this.loggedInUser = this.userService.getLoggedInUser();
    if (this.loggedInUser.id) {
      this.getLoggedSoulacais();
    }
  }
  async getLoggedSoulacais() {
    this.loggedInUser = this.userService.getLoggedInUser();
    this.getSoulacais(this.loggedInUser.id).subscribe({
      next: (result) => {
        localStorage.setItem(this.SOULACAIS, JSON.stringify(result));
        console.log('soulacais set in lcoal ');
      },
      error: (e) => {
        this.loggedInSoulacais.user = this.loggedInUser;
        this.createSoulacais(this.loggedInSoulacais);
      },
    });
  }
  getSoulacais(id: number): Observable<Soulacais> {
    return this.http.get<Soulacais>(
      `${environment.soulac_api_url}` + '/soulacais' + `/${id}`
    );
  }

  createSoulacais(soulacais: CreateSoulacaisForm): void {
    this.http
      .post<Soulacais>(
        `${environment.soulac_api_url}` + '/soulacais',
        soulacais
      )
      .subscribe({
        next: (result) => {
          this.router.navigate(['/']);
        },
      });
  }
  updateSoulacais(soulacais: UpdateSoulacaisForm): void {
    this.http
      .patch<Soulacais>(
        `${environment.soulac_api_url}` + '/soulacais',
        soulacais
      )
      .subscribe({
        next: (result) => {
          this.router.navigate(['/']);
        },
      });
  }

  getLoggedInSoulacais(): Soulacais {
    const storedSoulacais = localStorage.getItem(this.SOULACAIS);
    if (!storedSoulacais) return new Soulacais();
    this.loggedInSoulacais = JSON.parse(storedSoulacais);
    return this.loggedInSoulacais;
  }
}
