import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BasicAuthHtppInterceptorService implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (sessionStorage.getItem('userName') && sessionStorage.getItem('token')) {
      req = req.clone({
        headers: req.headers.set('Authorization', sessionStorage.getItem('token')!),
      });
    }
    return next.handle(req);
  }
}
