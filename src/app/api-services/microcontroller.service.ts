import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchRequest } from '../common/app.model';
import { AddMicroDto, MicrocontrollerSearchResponse, MicroItemDto, MicroItemMinimalDto, MicrosIdentity, UpdateMicroDto } from '../common/microcontroller.model';
import { MicrocontrollerMockService } from '../mock-services/microcontroller-mock.service';
import { UtilityService } from '../services/utility.service';
import {DataParameterParams, GraphDataParameterDto} from "../common/parameter.model";
import {DatePipe} from "@angular/common";

export interface MicrocontrollerServiceInterface {
  search(data: SearchRequest, land_id?:number): Observable<MicrocontrollerSearchResponse>;
  add(data: AddMicroDto):Observable<number>;
  update(id:number,data:UpdateMicroDto):Observable<void>;
  delete(id:number):Observable<void>;
  showMinimal(land_id:number):Observable<MicroItemMinimalDto[]>;
  showOverviewMicro(land_id:number, data:MicrosIdentity):Observable<MicroItemDto[]>;
  showMicroParameterByRegion(region_id: number): Observable<MicroItemMinimalDto[]>;
  showSensorParameterByRegion(region_id: number, data: DataParameterParams): Observable<GraphDataParameterDto[]>
}



@Injectable({
  providedIn: 'root',
  useFactory: (p: any[], h: HttpClient, u: UtilityService, d: DatePipe) => {
    if (p[0] === true) {
      return new MicrocontrollerMockService();
    } else {
      return new MicrocontrollerService(h, u, d);
    }
  },
  deps: ['mocking', HttpClient, UtilityService, DatePipe],
})
export class MicrocontrollerService implements MicrocontrollerServiceInterface{

  constructor(
    private http: HttpClient,
    private utilityService: UtilityService,
    public datePipe: DatePipe
  ) {}
  showOverviewMicro(land_id: number, data: MicrosIdentity): Observable<MicroItemDto[]> {
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

  showMicroParameterByRegion(region_id: number): Observable<MicroItemMinimalDto[]> {
    return this.http.get<MicroItemMinimalDto[]>('/api/MikroCrud/GetMikroName/' + region_id);
  }

  showSensorParameterByRegion(region_id: number, data: DataParameterParams): Observable<GraphDataParameterDto[]> {
    let params = new HttpParams()
      .set('ParamDate', this.datePipe.transform(data.ParamDate, "YYYY-MM-dd\'T00:00:00\'") ?? "2020-01-01T00:00:00");
    for (const microId of data.MicroIds) {
      params = params.append('MicroIds', microId);
    }
    for (const parentTypeId of data.ParentTypeIds) {
      params = params.append('ParentTypeIds', parentTypeId);
    }
    return this.http.get<GraphDataParameterDto[]>('/api/MikroCrud/ShowSensorParameterWithRegion/'+region_id, {params: params});
  }


}
