import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MiniPcMockingService } from '../mock-services/mini-pc-mocking.service';
import { UtilityService } from '../services/utility.service';

@Injectable({
  providedIn: 'root',
  useFactory: (p: any[], h: HttpClient, u: UtilityService) => {
    if (p[0] === true) {
      return new MiniPcMockingService();
    } else {
      return new MiniPcService(h, u);
    }
  },
  deps: ['mocking', HttpClient, UtilityService],
})
export class MiniPcService {

  constructor(
    private http: HttpClient,
    private utilityService: UtilityService
  ) {}
  // ShowMiniPcInALand
}
