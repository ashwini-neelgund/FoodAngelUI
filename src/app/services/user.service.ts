import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseURL = "http://localhost:8080/angel";

  constructor(private httpClient: HttpClient) { }

  //calls rest url for angel registration
  registerAngel(userAndImageData: FormData): Observable<Object>{
    return this.httpClient.post(this.baseURL+'/register',userAndImageData);
  }

}
