import { Injectable } from '@angular/core';
import { PlantMockService } from '../mock-services/plant-mock.service';

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
export class PlantService {

  constructor(
    private http: HttpClient,
    private utilityService: UtilityService
  ) {}
}
