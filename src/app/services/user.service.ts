import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseURL = "http://localhost:8080";

  constructor(private httpClient: HttpClient) { }

  registerAngel(angel: User): Observable<Object>{
    console.log("service method");
    console.log(angel);
    return this.httpClient.post('${this.baseURL}'+'/register',angel);
  }

}
