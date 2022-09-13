import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchRequest } from '../common/app.model';
import { LandSearchResponse } from '../common/land.model';
import { LandMockService } from '../mock-services/land-mock.service';
import { UtilityService } from '../services/utility.service';



export interface LandServiceInterface {
  search(data: SearchRequest): Observable<LandSearchResponse>;
}

@Injectable({
  providedIn: 'root',
  useFactory: (p: any[], h: HttpClient, u: UtilityService) => {
    if (p[0] === true) {
      return new LandMockService();
    } else {
      return new LandService(h, u);
    }
  },
  deps: ['mocking', HttpClient, UtilityService],
})
export class LandService implements LandServiceInterface{

  constructor(
    private http: HttpClient,
    private utilityService: UtilityService
  ) {
    console.log("using land service");

  }
  search(data: SearchRequest): Observable<LandSearchResponse> {
    return this.http.get<LandSearchResponse>('api',{params: this.utilityService.convertModelToHttpParams(data)});
  }
  
}
