import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../models/item';
import { Request } from '../models/request';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class SeekerService {
  private baseURL = 'http://localhost:8080/seeker';

  constructor(private httpClient: HttpClient) {}

  //checks if angel for that zipcode exists or not
  checkForAngel(zipCode: any) {
    return this.httpClient.get(`${this.baseURL}/check/angel/${zipCode}`);
  }

  //returns list of all the items that an seeker can choose from
  getItems(): Observable<Item[]> {
    return this.httpClient.get<Item[]>(`${this.baseURL}/items`);
  }

  //calls rest url for new request logging
  logRequest(user: User): Observable<Request> {
    return this.httpClient.post<Request>(`${this.baseURL}/add/request`, user);
  }

  //returns the request details of particular request
  getRequest(id: number, pin: number): Observable<Request> {
    return this.httpClient.get<Request>(`${this.baseURL}/request/${id}/${pin}`);
  }

  //calls rest url for request updation
  updateRequest(request: Request): Observable<Object> {
    return this.httpClient.post(`${this.baseURL}/update/request`, request);
  }

  //calls rest url for request deletion
  deleteRequest(requestId: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseURL}/remove/request/${requestId}`);
  }
}
