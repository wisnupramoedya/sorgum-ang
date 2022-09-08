import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../api-services/account.service';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AnonymousGuard implements CanActivate, CanActivateChild {
  constructor(
    private tokenService:TokenService,
    private accountService:AccountService,
    private router:Router
  ){

  }
  private tokenExpired(exp:number) {
    return (Math.floor((new Date).getTime() / 1000)) >= exp;
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const token = this.tokenService.getTokenObject();
      if(!!token){
        if(this.tokenExpired(token.exp)){
          this.accountService.logout();

          return true;
        }
        else{
          this.router.navigateByUrl("/home",{replaceUrl:true});
          return false;
        }
      }
      return true;
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const token = this.tokenService.getTokenObject();
      if(!!token){
        if(this.tokenExpired(token.exp)){
          this.accountService.logout();

          return true;
        }
        else{
          this.router.navigateByUrl("/home",{replaceUrl:true});
          return false;
        }
      }
      return true;
  }
  
}
