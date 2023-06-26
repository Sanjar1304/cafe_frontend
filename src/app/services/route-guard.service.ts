import { ActivatedRouteSnapshot, Router } from '@angular/router';

import { AuthService } from './auth.service';
import { GlobalConstants } from '../shared/global-constant';
import { Injectable } from '@angular/core';
import { SnackbarService } from './snackbar.service';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService {

  constructor(public auth: AuthService,
              public router: Router,
              private snackbar: SnackbarService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean{
    let expectedRoleArray = route.data;
    expectedRoleArray = expectedRoleArray.expectedRole;

    const token: any = localStorage.getItem('token');
    var tokenPayLoad: any;
    try {
      tokenPayLoad = jwt_decode(token);
    } catch (error) {
      localStorage.clear();
      this.router.navigate(['/']);
    }

    let checkRole = false;

    for(let i = 0; i < expectedRoleArray.length; i++){
      if(expectedRoleArray[i] == tokenPayLoad.role){
        checkRole = true;
      }
    }

    if(tokenPayLoad.role == 'user' || tokenPayLoad.role == 'admin'){
      if(this.auth.isAuthenticated() && checkRole){
        return true;
      }
      this.snackbar.openSnackBar(GlobalConstants.unauthorized, GlobalConstants.error);
      this.router.navigate(['/cafe/dashboard']);
      return false;
    }else {
      this.router.navigate(['/']);
      localStorage.clear();
      return false;
    }
  }
}
