import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../models/item';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class SeekerService {

  private baseURL = "http://localhost:8080/seeker";

  constructor(private httpClient: HttpClient) { }

  checkForAngel(zipCode: any) {
    return this.httpClient.get(`${this.baseURL}/check/angel/${zipCode}`);
  }

  getItems(): Observable<Item[]> {  
    return this.httpClient.get<Item[]>(`${this.baseURL}/items`);  
  }  

  //calls rest url for request logging
  logRequest(user: User): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}/add/request`,user);
  }

}
