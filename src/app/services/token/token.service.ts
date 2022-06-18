import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  USER_TOKEN: string = 'userToken';

  constructor() {}

  setToken(token: string): void {
    localStorage.removeItem(this.USER_TOKEN);
    localStorage.setItem(this.USER_TOKEN, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.USER_TOKEN);
  }
}
