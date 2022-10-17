import { Injectable } from '@angular/core';
import {TokenService} from "./token.service";
import {AppTokenModel} from "../common/app.model";
import {User} from "../common/account.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private tokenService: TokenService
  ) {}

  getUser(): User|null {
    const user = this.tokenService.getTokenObject() as User;
    if (!user) {
      return null;
    }
    return user;
  }

  getRole(): number {
    const user = this.getUser();
    if (!user) {
      return 0;
    }
    return user.role;
  }
}
