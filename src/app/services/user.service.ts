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
    const appToken = this.tokenService.getTokenObject();
    if (!appToken) {
      return null;
    }
    const user: User = {
      name: appToken.name,
      email: appToken.email,
      role: Number(appToken.role)
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
