import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom, Observable } from 'rxjs';
import { Group } from 'src/app/models/group/group.model';
import { Page } from 'src/app/models/page.model';
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
  async getLoggedSoulacais(): Promise<void> {
    this.loggedInUser = this.userService.getLoggedInUser();
    return firstValueFrom(this.getSoulacais(this.loggedInUser.id)).then(
      (result) => {
        if (result) {
          localStorage.setItem(this.SOULACAIS, JSON.stringify(result));
        } else {
          this.loggedInSoulacais.user = this.loggedInUser;
          this.createSoulacais(this.loggedInSoulacais);
        }
      }
    );
  }
  getSoulacais(id: number): Observable<Soulacais> {
    return this.http.get<Soulacais>(
      `${environment.soulac_api_url}` + '/soulacais' + `/${id}`
    );
  }

  getSoulacaisGroups(id: number, page: Page): Observable<Group[]> {
    const params = {
      nbr: page.nbr,
      limit: page.limit,
      search: page.search,
      orderBy: page.orderBy,
      orderByAsc: page.orderByAsc,
    };
    return this.http.get<Group[]>(
      `${environment.soulac_api_url}` + `/soulacais/${id}` + '/groups',
      { params }
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
