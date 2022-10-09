import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchRequest } from '../common/app.model';
import {
  SensorSearchResponse,
  AddSensorDto,
  UpdateSensorDto,
  SensorType,
  SensorMinimalItemDto
} from '../common/sensor.model';
import { SensorMockService } from '../mock-services/sensor-mock.service';
import { UtilityService } from '../services/utility.service';
import {MicroItemMinimalDto} from "../common/microcontroller.model";

export interface SensorServiceInterface {
  // create(data: GreenHouseCreateForm): Observable<CreateResponse<number>>;
  search(data: SearchRequest, land_id?:number): Observable<SensorSearchResponse>;
  add(data: AddSensorDto):Observable<number>;
  update(id:number,data:UpdateSensorDto):Observable<void>;
  delete(id:number):Observable<void>;
  getSensorTypes():Observable<SensorType[]>;
  showSensorParameterOverRegion(region_id: number): Observable<SensorMinimalItemDto[]>;
  showSensorParameterOverMicrocontroller(microcontroller_id: number): Observable<SensorMinimalItemDto[]>;
}

@Injectable({
  providedIn: 'root',
  useFactory: (p: any[], h: HttpClient, u: UtilityService) => {
    if (p[0] === true) {
      return new SensorMockService();
    } else {
      return new SensorService(h, u);
    }
  },
  deps: ['mocking', HttpClient, UtilityService],
})
export class SensorService  implements SensorServiceInterface{

  constructor(
    private http: HttpClient,
    private utilityService: UtilityService
  ) { }

  getSensorTypes(): Observable<SensorType[]> {
    return this.http.get<SensorType[]>('/api/SensorCrud/GetSensorTypes');
  }
  search(data: SearchRequest, land_id?: number | undefined): Observable<SensorSearchResponse> {
    const params = new HttpParams({
      fromObject: {...data}
    });
    return this.http.get<SensorSearchResponse>('/api/SensorCrud/Search'+(land_id===undefined?'':'/'+land_id),{params: params});
  }
  add(data: AddSensorDto): Observable<number> {
    return this.http.post<number>('/api/SensorCrud/AddSensor',data);
  }
  update(id: number, data: UpdateSensorDto): Observable<void> {
    return this.http.put<void>('/api/SensorCrud/UpdateSensor/'+id,data);
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>('/api/SensorCrud/DeleteSensor/'+id);
  }
  showSensorParameterOverRegion(region_id: number): Observable<SensorMinimalItemDto[]> {
    return this.http.get<SensorMinimalItemDto[]>('/api/MikroCrud/ShowSensorParameterWithRegion/' + region_id);
  }
  showSensorParameterOverMicrocontroller(microcontroller_id: number): Observable<SensorMinimalItemDto[]> {
    return this.http.get<SensorMinimalItemDto[]>('/api/MikroCrud/ShowSensorParameterWithMicrocontroller/' + microcontroller_id);
  }
}
