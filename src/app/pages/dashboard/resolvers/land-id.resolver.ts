import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  ActivatedRoute
} from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LandIdResolver implements Resolve<number> {
  constructor(
    private router:ActivatedRoute
  ){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<number> {
    return route.params['landId'];
  }
}
