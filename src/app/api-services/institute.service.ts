import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Select} from "../common/form.model";
import {InstituteMockService} from "../mock-services/institute-mock.service";
import {HttpClient} from "@angular/common/http";
import {UtilityService} from "../services/utility.service";

export interface InstituteServiceInterface {
  showForSelect(): Observable<Select[]>;
}

@Injectable({
  providedIn: 'root',
  useFactory: (p: any[], h: HttpClient, u: UtilityService) => {
    if (p[0] === true) {
      return new InstituteMockService();
    } else {
      return new InstituteService(h, u);
    }
  },
  deps: ['mocking', HttpClient, UtilityService],
})
export class InstituteService implements InstituteServiceInterface {

  constructor(
    private http: HttpClient,
    private utilityService: UtilityService
  ) { }

  showForSelect(): Observable<Select[]> {
    return this.http.get<Select[]>('/api/AccountCrud/GetInstitutedName');
  }
}
