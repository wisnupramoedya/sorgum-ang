import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchRequest } from '../common/app.model';
import { MicrocontrollerSearchResponse } from '../common/microcontroller.model';
import { MicrocontrollerMockService } from '../mock-services/microcontroller-mock.service';
import { UtilityService } from '../services/utility.service';

export interface MicrocontrollerServiceInterface {
  
  search(data: SearchRequest): Observable<MicrocontrollerSearchResponse>;
}



@Injectable({
  providedIn: 'root',
  useFactory: (p: any[], h: HttpClient, u: UtilityService) => {
    if (p[0] === true) {
      return new MicrocontrollerMockService();
    } else {
      return new MicrocontrollerService(h, u);
    }
  },
  deps: ['mocking', HttpClient, UtilityService],
})
export class MicrocontrollerService implements MicrocontrollerServiceInterface{

  constructor(
    private http: HttpClient,
    private utilityService: UtilityService
  ) {}
  search(data: SearchRequest): Observable<MicrocontrollerSearchResponse> {
    throw new Error('Method not implemented.');
  }
}
