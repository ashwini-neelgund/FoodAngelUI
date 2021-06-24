import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Request } from '../models/request';

@Injectable({
  providedIn: 'root',
})
export class AngelService {
  private baseURL = 'http://localhost:8080/angel';

  constructor(private httpClient: HttpClient) {}

  //returns list of all new requests from zipcode of angel
  getNewRequests(username: string): Observable<Request[]> {
    return this.httpClient.get<Request[]>(
      `${this.baseURL}/new/requests/${username}`
    );
  }

  //returns list of all the requests assigned to angel
  getAssignedRequests(username: string): Observable<Request[]> {
    return this.httpClient.get<Request[]>(
      `${this.baseURL}/requests/${username}`
    );
  }

  //request assigned to angel
  assignRequest(requestId: number, username: string): Observable<Request[]> {
    return this.httpClient.get<Request[]>(
      `${this.baseURL}/add/request/${requestId}/${username}`
    );
  }

  //request is updated
  updateRequestAsComplete(requestId: number): Observable<Request[]> {
    return this.httpClient.get<Request[]>(
      `${this.baseURL}/request/status/${requestId}`
    );
  }

    //calls rest url to remove request assigned to angel
    removeAssignedRequest(requestId: number, username: string): Observable<Request[]> {
      return this.httpClient.get<Request[]>(`${this.baseURL}/remove/request/${requestId}/${username}`);
    }
}
