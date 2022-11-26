import { Injectable } from '@angular/core';
import {SearchRequest} from "../common/app.model";
import {Observable, of} from "rxjs";
import {AddUserDto, UpdateUserDto, UserSearchResponse} from "../common/user.model";
import {HttpClient, HttpParams} from "@angular/common/http";
import {UtilityService} from "../services/utility.service";
import {UserListMockService} from "../mock-services/user-list-mock.service";

export interface UserListServiceInterface {
  search(data: SearchRequest): Observable<UserSearchResponse>;
  add(data: AddUserDto): Observable<number>;
  update(id: number, data: UpdateUserDto): Observable<void>;
  delete(id: number): Observable<void>;
}

@Injectable({
  providedIn: 'root',
  useFactory: (p: any[], h: HttpClient, u: UtilityService) => {
    if (p[0]) {
      return new UserListMockService();
    } else {
      return new UserListService(h, u);
    }
  },
  deps: ['mocking', HttpClient, UtilityService],
})
export class UserListService implements UserListServiceInterface {

  constructor(
    private http: HttpClient,
    private utilityService: UtilityService
  ) { }

  search(data: SearchRequest): Observable<UserSearchResponse> {
    const params = new HttpParams({
      fromObject: {...data}
    });
    return this.http.get<UserSearchResponse>('/api/InstitutedUser/Search',{params: params});
  }

  add(data: AddUserDto): Observable<number> {
    return this.http.post<number>('api/AccountCrud/Create', this.utilityService.convertModelToFormData(data));
  }

  update(id: number, data: UpdateUserDto): Observable<void> {
    return this.http.put<void>(`api/AccountCrud/Update/${id}`, this.utilityService.convertModelToFormData(data));
  }

  delete(id: number): Observable<void> {
    throw Error("not implemented yet");
  }
}
