import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchRequest } from '../common/app.model';
import { AddMicroDto, MicrocontrollerSearchResponse, MicroItemDto, MicroItemMinimalDto, MicrosIdenity, UpdateMicroDto } from '../common/microcontroller.model';
import { MicrocontrollerMockService } from '../mock-services/microcontroller-mock.service';
import { UtilityService } from '../services/utility.service';
import {SensorMinimalItemDto} from "../common/sensor.model";

export interface MicrocontrollerServiceInterface {
  search(data: SearchRequest, land_id?:number): Observable<MicrocontrollerSearchResponse>;
  add(data: AddMicroDto):Observable<number>;
  update(id:number,data:UpdateMicroDto):Observable<void>;
  delete(id:number):Observable<void>;
  showMinimal(land_id:number):Observable<MicroItemMinimalDto[]>;
  showOverviewMicro(land_id:number, data:MicrosIdenity):Observable<MicroItemDto[]>;
  showMicroParameterOverRegion(region_id: number): Observable<MicroItemMinimalDto[]>;
  showMicroParameterOverSensor(sensor_id: number): Observable<MicroItemMinimalDto[]>;
}



@Injectable({
  providedIn: 'root',
  useFactory: (p: any[], h: HttpClient, u: UtilityService) => {
    if (p[0] === true) {
      return new MicrocontrollerMockService();
    } else {
      return new MicrocontrollerService(h, u);
    }
  },
  deps: ['mocking', HttpClient, UtilityService],
})
export class MicrocontrollerService implements MicrocontrollerServiceInterface{

  constructor(
    private http: HttpClient,
    private utilityService: UtilityService
  ) {}
  showOverviewMicro(land_id: number, data: MicrosIdenity): Observable<MicroItemDto[]> {
    const params = new HttpParams({
      fromObject: {...data}
    });
    return this.http.get<MicroItemDto[]>('/api/MikroCrud/ShowOverviewMicro/'+land_id, {params:params});

  }
  add(data: AddMicroDto): Observable<number> {
    return this.http.post<number>('/api/MikroCrud/AddMicro',data);
  }
  update(id: number, data: UpdateMicroDto): Observable<void> {
    return this.http.put<void>('/api/MikroCrud/UpdateMicro/'+id,data);
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>('/api/MikroCrud/DeleteMicro/'+id);
  }
  showMinimal(land_id: number): Observable<MicroItemMinimalDto[]> {
    return this.http.get<MicroItemMinimalDto[]>('/api/MikroCrud/ShowMinimalMicro/'+land_id);
  }
  search(data: SearchRequest, land_id?: number): Observable<MicrocontrollerSearchResponse> {
    const params = new HttpParams({
      fromObject: {...data}
    });
    console.log('/api/MikroCrud/Search'+(land_id===undefined?'':'/'+land_id));
    return this.http.get<MicrocontrollerSearchResponse>('/api/MikroCrud/Search'+(land_id===undefined?'':'/'+land_id),{params: params});
  }

  showMicroParameterOverRegion(region_id: number): Observable<MicroItemMinimalDto[]> {
    return this.http.get<MicroItemMinimalDto[]>('/api/MikroCrud/ShowSensorParameterWithRegion/' + region_id);
  }

  showMicroParameterOverSensor(sensor_id: number): Observable<MicroItemMinimalDto[]> {
    return this.http.get<MicroItemMinimalDto[]>('/api/MikroCrud/ShowSensorParameterWithMicrocontroller/' + sensor_id);
  }
}
