import { Injectable } from '@angular/core';
import {ActuatorServiceInterface} from "../api-services/actuator.service";
import {SearchRequest} from "../common/app.model";
import {ActuatorSearchResponse} from "../common/actuator.model";
import {Observable} from "rxjs";

@Injectable()
export class ActuatorMockService implements ActuatorServiceInterface {

  constructor() { }

  search(data: SearchRequest, land_id?: number): Observable<ActuatorSearchResponse> {
    throw new Error("not implemented");
  }


}
