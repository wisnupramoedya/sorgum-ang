import { Injectable } from '@angular/core';
import {InstituteServiceInterface} from "../api-services/institute.service";
import {Observable, of} from "rxjs";
import {Select} from "../common/form.model";

@Injectable({
  providedIn: 'root'
})
export class InstituteMockService implements InstituteServiceInterface {

  constructor() { }

  showForSelect(): Observable<Select[]> {
    const instituteSelection: Select[] = [
      {
        Id: 1,
        Name: "PT ITS"
      },
      {
        Id: 2,
        Name: "PT ITS 2"
      },
    ];

    return of(instituteSelection);
  }
}
