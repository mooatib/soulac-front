import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom, Observable } from 'rxjs';
import { CreateSoulacaisForm } from 'src/app/models/soulacais/soulacais-form.model';
import { environment } from 'src/environments/environment';
import { UserForm } from '../../models/user/user-form.model';
import { UserLoginResponse } from '../../models/user/user-login-reponse.model';
import { User } from '../../models/user/user.model';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  USER: string = 'user';
  soulacais: CreateSoulacaisForm = new CreateSoulacaisForm();

  private loggedInUser: User;

  constructor(
    private http: HttpClient,
    private service: TokenService,
    private router: Router
  ) {
    this.getUserInfo();
  }

  async login(user: UserForm): Promise<void> {
    return firstValueFrom(this.getToken(user)).then(async (result) => {
      this.service.setToken(result.access_token);
      await firstValueFrom(this.getUserInfo()).then((result) => {
        this.loggedInUser = result;
        localStorage.setItem(this.USER, JSON.stringify(result));
      });
    });
  }

  getToken(user: UserForm): Observable<UserLoginResponse> {
    const body = new HttpParams()
      .set('username', user.email)
      .set('password', user.password);
    return this.http.post<UserLoginResponse>(
      `${environment.auth_api_url}` + '/login',
      body
    );
  }
  register(user: UserForm): Observable<User> {
    return this.http.post<User>(
      `${environment.auth_api_url}` + '/register',
      user
    );
  }

  logout() {
    localStorage.clear();
    this.loggedInUser = new User();
  }

  getUserInfo(): Observable<User> {
    return this.http.get<User>(`${environment.auth_api_url}` + '/token');
  }

  getLoggedInUser(): User {
    const storedUser = localStorage.getItem(this.USER);
    if (!storedUser) return new User();
    this.loggedInUser = JSON.parse(storedUser);
    return this.loggedInUser;
  }

  isUserLogged(): boolean {
    return localStorage.getItem(this.USER) != null;
  }

  getRoles(): string {
    let roles = localStorage.getItem(this.USER);
    if (!roles) return '';
    return roles;
  }
}
