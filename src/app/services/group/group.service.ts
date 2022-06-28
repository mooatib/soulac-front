import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Drink } from 'src/app/models/drink/drink.model';
import { Group } from 'src/app/models/group/group.model';
import { Page } from 'src/app/models/page.model';
import { Soulacais } from 'src/app/models/soulacais/soulacais.models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  constructor(private http: HttpClient) {}

  getGroup(name: string): Observable<Group> {
    return this.http.get<Group>(
      `${environment.soulac_api_url}` + '/groups' + `/${name}`
    );
  }

  getGroupUsers(id: number, page: Page): Observable<Soulacais[]> {
    const params = {
      nbr: page.nbr,
      limit: page.limit,
      search: page.search,
      orderBy: page.orderBy,
      orderByAsc: page.orderByAsc,
    };
    return this.http.get<Soulacais[]>(
      `${environment.soulac_api_url}` + '/groups' + `/${id}/users`,
      { params }
    );
  }
  getGroupDrinks(id: number, page: Page): Observable<Drink[]> {
    const params = {
      nbr: page.nbr,
      limit: page.limit,
      search: page.search,
      orderBy: page.orderBy,
      orderByAsc: page.orderByAsc,
    };
    return this.http.get<Drink[]>(
      `${environment.soulac_api_url}` + '/groups' + `/${id}/drinks`,
      { params }
    );
  }
}
