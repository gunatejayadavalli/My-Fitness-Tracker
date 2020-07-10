import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router, CanLoad, Route } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private authService : AuthService, private router : Router) { }

  canLoad(route: Route) {
    if(this.authService.isAuth()){
      return true;
    }else{
      this.router.navigate(['/login']);
    }
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(this.authService.isAuth()){
      return true;
    }else{
      this.router.navigate(['/login']);
    }
  }


}
