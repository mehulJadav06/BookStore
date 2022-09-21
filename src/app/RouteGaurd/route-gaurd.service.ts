import { Injectable } from '@angular/core';
import {
  Router, CanActivate, ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
export class RouteGuard implements CanActivate {
  constructor(private router: Router) { }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (localStorage.getItem('token')) {
      return true;
    }

    this.router.navigate(['/login'], {
      queryParams: {
        returnUrl: state.url
      }
    });

    return false;
  }
}