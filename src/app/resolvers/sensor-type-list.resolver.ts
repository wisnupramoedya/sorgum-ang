import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { SensorService } from '../api-services/sensor.service';
import { SensorType } from '../common/sensor.model';

@Injectable({
  providedIn: 'root'
})
export class SensorTypeListResolver implements Resolve<SensorType[]> {
  constructor(
    private sensorService:SensorService
  ){

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SensorType[]> {
    return this.sensorService.getSensorTypes()
  }
}
