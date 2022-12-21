import { Injectable } from '@angular/core';
import {UserListServiceInterface} from "../api-services/user-list.service";
import {SearchRequest} from "../common/app.model";
import {map, Observable, of} from "rxjs";
import {AddUserDto, UpdateUserDto, UserItemMinimalDto, UserSearchResponse} from "../common/user.model";
import {Role} from "../common/account.model";

@Injectable({
  providedIn: 'root'
})
export class UserListMockService implements UserListServiceInterface {

  constructor() { }

  search(data: SearchRequest): Observable<UserSearchResponse> {
    const items: UserItemMinimalDto[] = [
      {
        Id: 1,
        Name: "Adhi",
        Email: "adhi@mail.com",
        RoleId: 1
      }
    ];

    const result: UserSearchResponse = {
      Data: items,
      NTotal: items.length
    }

    return of(result).pipe(map(x => {
      x.Data = x.Data.filter(y => y.Name.includes(data.Search)
        || y.Email.includes(data.Search));
      x.NTotal = x.Data.length;
      return x;
    }));
  }

  add(data: AddUserDto): Observable<number> {
    return of(1);
  }

  update(id: number, data: UpdateUserDto): Observable<void> {
    return of(void 0);
  }

  delete(id: number): Observable<void> {
    throw Error("not implemented yet");
  }
}
