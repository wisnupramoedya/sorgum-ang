import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AccountAPI } from '../apis/account.api';
import { UserLoginForm, LoginResponse } from '../common/account.model';

@Injectable()
export class UserMockService {

  constructor() { 
    console.log("from mock user");
    
  }
   public login(data:UserLoginForm):Observable<LoginResponse>{
    console.log("form login mock user");
    
    const t: LoginResponse={
      accessToken:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiZW1haWwiOiJkZW1vQGdtYWlsLmNvbSIsImdpdmVuX25hbWUiOiJkZW1vIGFjY291bnQiLCJuYmYiOjE3NjI3MTgxNjA5NzUsImV4cCI6MTc2MjcxODE3MDk3NX0.76NsxxsHsGdmt4_rRlAcVLOOPLHXR8kBZLQ4TQ8u6Dw",
      message:"SUCEESS LOGIN"
    };
    return of (t)
  }
}
