import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Helpers } from './helpers';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private helper: Helpers) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    var referral = state.root.queryParams['referral'];
    if(referral != undefined)
    {
        console.log("stored");
        window.sessionStorage['referral'] = referral;
    }
    
    if (!this.helper.isAuthenticated()) {
      this.router.navigate(['/account/login']);
      return false;
    }
    this.helper.isAuthenticationChanged().subscribe(authenticated => 
      {
      if(!authenticated)
        {
          this.router.navigate(['/account/login']);
        }
      })
    return true;
  }
}