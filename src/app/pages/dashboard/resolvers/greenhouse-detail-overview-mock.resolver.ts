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

@Injectable()
export class GreenhouseDetailOverviewMockResolver implements Resolve<GreenHouseDetailDto> {
 constructor(
    private greenshouseService:GreenHouseService,
    
  ){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<GreenHouseDetailDto> {
    return this.greenshouseService.getGreenHouseById(7);
  }
}
