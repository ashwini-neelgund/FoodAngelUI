import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JwtClientService {
  constructor(private http: HttpClient) {}

  public generateToken(request: any) {
    return this.http.post<string>(
      'http://localhost:8080/authenticate',
      request,
      { responseType: 'text' as 'json' }
    );
  }

  public logout() {
    sessionStorage.removeItem('userName');
  }

  public isUserLoggedIn() {
    let user = sessionStorage.getItem('userName');
    return !(user === null);
  }
}
