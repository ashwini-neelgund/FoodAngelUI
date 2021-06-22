import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Request } from '../models/request';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseURL = "http://localhost:8080";

  constructor(private httpClient: HttpClient) { }

  //calls rest url for angel registration
  registerAngel(userAndImageData: FormData): Observable<User>{
    return this.httpClient.post<User>(this.baseURL+'/register',userAndImageData);
  }

  getNewRequestsInArea(username: string): Observable<Request[]>{
    return this.httpClient.get<Request[]>(this.baseURL+'/angel/new/requests'+username);
  }

  getAssignedRequests(username: string): Observable<Request[]>{
    return this.httpClient.get<Request[]>(this.baseURL+'/angel/requests',{params: new HttpParams().set("username",username)});
  }
}
