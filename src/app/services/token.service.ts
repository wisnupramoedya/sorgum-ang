import { Injectable } from '@angular/core';
import { AppTokenModel } from '../common/app.model';
import jwt_decode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  key = 'ghc_access_token';
  tokenSubs: BehaviorSubject<AppTokenModel|null> = new BehaviorSubject<AppTokenModel|null>(null);

  constructor() { }

  setItem(token: string): void{
    window.localStorage.setItem(this.key, token);
  }
  removeToken():void{
    window.localStorage.removeItem(this.key);
  }
  clearLocalStorage():void{
    window.localStorage.clear();
  }

  getTokenAsString(): string|null{
    return window.localStorage.getItem(this.key);
  }
  getTokenObject(): AppTokenModel|null{
    const t = this.getTokenAsString();
    if (t !== null){
      return jwt_decode(t);
    }
    return null;
  }
}
