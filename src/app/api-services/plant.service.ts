import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchRequest } from '../common/app.model';
import { PlantSearchResponse } from '../common/plant.model';
import { PlantMockService } from '../mock-services/plant-mock.service';
import { UtilityService } from '../services/utility.service';

export interface PlantServiceInterface {
  // create(data: GreenHouseCreateForm): Observable<CreateResponse<number>>;
  search(data: SearchRequest): Observable<PlantSearchResponse>;
  
}


@Injectable({
  providedIn: 'root',
  useFactory: (p: any[], h: HttpClient, u: UtilityService) => {
    if (p[0] === true) {
      return new PlantMockService();
    } else {
      return new PlantService(h, u);
    }
  },
  deps: ['mocking', HttpClient, UtilityService],
})
export class PlantService implements PlantServiceInterface{

  constructor(
    private http: HttpClient,
    private utilityService: UtilityService
  ) {}
  search(data: SearchRequest): Observable<PlantSearchResponse> {
    throw new Error('Method not implemented.');
  }
}
