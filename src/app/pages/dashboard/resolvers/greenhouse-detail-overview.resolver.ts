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

@Injectable({
  providedIn: 'root'
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
