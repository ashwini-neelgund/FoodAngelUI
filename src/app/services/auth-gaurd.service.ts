import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { JwtClientService } from './jwt-client.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGaurdService implements CanActivate {
  constructor(private router: Router, private loginService: JwtClientService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (this.loginService.isUserLoggedIn()) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}
