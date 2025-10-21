import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  baseUrl: string = "http://localhost:3001";

  constructor(private http: HttpClient) { }

  register(password: string): any{
    return this.http.post(
      `${this.baseUrl}/user/register`,
      {
        password
      }
    );
  }

  login(secureChatNumber: string, password: string): any{
    return this.http.post(
      `${this.baseUrl}/user/login`,
      {
        secureChatNumber,
        password
      }
    );
  }
}
