import {Injectable} from '@angular/core';
import {TokenService} from "./token.service";
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
    return {
      ...appToken,
      role: Number(appToken.role)
    } as User;
  }

  getRole(): number {
    const user = this.getUser();
    if (!user) {
      return 0;
    }
    return user.role;
  }
}
