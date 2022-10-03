import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CreateDescriptionParameter,
  CreateParameter,
  DeleteParameter,
  ParamOverv,
  ParamOverview,
  ParamSelectItem,
  UpdateDescriptionParameter,
  UpdateParameter
} from '../common/plantparameter.model';
import { PlantParameterMockService } from '../mock-services/plant-parameter-mock.service';
import { UtilityService } from '../services/utility.service';


export interface PlantParameterServiceInterface{
  create(data:CreateDescriptionParameter):Observable<number>;
  createGroup(data:CreateParameter):Observable<number[]>;
  delete(id:number):Observable<void>;
  deleteGroup(idPlant:number, ids:number[]):Observable<void>;
  update(id:number, data:UpdateDescriptionParameter):Observable<void>;
  updateGroup(idPlant:number, data: UpdateParameter):Observable<void>;
  showMinimalParam(land_id:number):Observable<string[]>;
  showParamOverview(land_id:number, data:ParamOverv):Observable<ParamOverview[]>;
  showAllParam():Observable<ParamSelectItem[]>;
}

@Injectable({
  providedIn: 'root',
  useFactory: (p: any[], h: HttpClient, u: UtilityService) => {
    if (p[0] === true) {
      return new PlantParameterMockService();
    } else {
      return new PlantParameterService(h, u);
    }
  },
  deps: ['mocking', HttpClient, UtilityService],
})
export class PlantParameterService implements PlantParameterServiceInterface{

  constructor(
    private http: HttpClient,
    private utilityService: UtilityService
  ) { }
  showParamOverview(land_id: number, data: ParamOverv): Observable<ParamOverview[]> {
    const params = new HttpParams({
      fromObject: {...data}
    });
    return this.http.get<ParamOverview[]>('/api/Param/ShowParamOverview/'+land_id,{params:params});
  }
  showMinimalParam(land_id: number): Observable<string[]> {
    return this.http.get<string[]>('/api/Param/ShowMinimalParam/'+land_id);
  }
  create(data: CreateDescriptionParameter): Observable<number> {
    return this.http.post<number>('/api/Param/CreateDescriptionParam',data);
  }
  createGroup(data: CreateParameter): Observable<number[]> {
    return this.http.post<number[]>('/api/Param/CreateParam',data);
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>('/api/Param/DeleteDescriptionParam/'+id);
  }
  deleteGroup(idPlant: number, ids: number[]): Observable<void> {
    const temp:DeleteParameter={
      Ids:ids
    };
    return this.http.delete<void>('/api/Param/DeleteParam/'+idPlant,{body:temp});
  }
  update(id: number, data: UpdateDescriptionParameter): Observable<void> {
    return this.http.put<void>('/api/Param/UpdateDescriptionParam/'+id,data);
  }
  updateGroup(idPlant: number, data: UpdateParameter): Observable<void> {
    return this.http.put<void>('/api/Param/UpdateParam/'+idPlant,data);
  }

  showAllParam(): Observable<ParamSelectItem[]> {
    return this.http.get<ParamSelectItem[]>('/api/Param/ShowParentParams');
  }

}
