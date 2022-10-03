import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MiniPcItem2DTO } from '../common/minipc.model';
import { MiniPcMockingService } from '../mock-services/mini-pc-mocking.service';
import { UtilityService } from '../services/utility.service';

export interface MiniPcServiceInterface {
  showMiniPcInALand(land_id:number): Observable<MiniPcItem2DTO[]>;
}

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
export class MiniPcService implements MiniPcServiceInterface{

  constructor(
    private http: HttpClient,
    private utilityService: UtilityService
  ) {}
  showMiniPcInALand(land_id: number): Observable<MiniPcItem2DTO[]> {
    return this.http.get<MiniPcItem2DTO[]>('/api/MiniPcsCrud/ShowMiniPcInALand/'+land_id);
  }
  
  
}
