import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { GreenHouseService } from 'src/app/api-services/green-house.service';
import { GreenHouseDetailDto } from 'src/app/common/greenhouse.model';
import { CurrentGreenHouseService } from 'src/app/services/current-green-house.service';
import { GreenhouseDetailOverviewMockResolver } from './greenhouse-detail-overview-mock.resolver';

@Injectable({
  providedIn: 'root',
  useFactory: (p:boolean, h: GreenHouseService, u:CurrentGreenHouseService) =>{
    if(p){
      return new  GreenhouseDetailOverviewMockResolver(h);
    }
    else{
     return  new GreenhouseDetailOverviewResolver(h,u);
    }
  },
  deps: ["mocking", GreenHouseService,CurrentGreenHouseService ],
})
export class GreenhouseDetailOverviewResolver implements Resolve<GreenHouseDetailDto> {
  constructor(
    private greenshouseService:GreenHouseService,
    private currentGH:CurrentGreenHouseService
  ){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<GreenHouseDetailDto> {
    this.currentGH.chosedGreenHouse.next(route.pathFromRoot[2].params['ghId']);
    return this.greenshouseService.getGreenHouseById(this.currentGH.chosedGreenHouse.value);
  }
}
