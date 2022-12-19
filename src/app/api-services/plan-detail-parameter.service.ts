import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CreateDescriptionParameter,
  CreateParameter,
  DeleteParameter,
  ParamSelectItem,
  UpdateDescriptionParameter,
  UpdateParameter
} from '../common/plan-detailparameter.model';
import { PlanDetailParameterMockService } from '../mock-services/plan-detail-parameter-mock.service';
import { UtilityService } from '../services/utility.service';


export interface PlanDetailParameterServiceInterface{
  create(data:CreateDescriptionParameter):Observable<number>;
  createGroup(data:CreateParameter):Observable<number[]>;
  delete(id:number):Observable<void>;
  deleteGroup(idPlanDetail:number, ids:number[]):Observable<void>;
  update(id:number, data:UpdateDescriptionParameter):Observable<void>;
  updateGroup(idPlanDetail:number, data: UpdateParameter):Observable<void>;
  showAllParam():Observable<ParamSelectItem[]>;
}

@Injectable({
  providedIn: 'root',
  useFactory: (p: any[], h: HttpClient, u: UtilityService) => {
    if (p[0] === true) {
      return new PlanDetailParameterMockService();
    } else {
      return new PlanDetailParameterService(h, u);
    }
  },
  deps: ['mocking', HttpClient, UtilityService],
})
export class PlanDetailParameterService implements PlanDetailParameterServiceInterface{

  constructor(
    private http: HttpClient,
    private utilityService: UtilityService
  ) { }
  create(data: CreateDescriptionParameter): Observable<number> {
    return this.http.post<number>('/api/Param/CreateDescriptionParam',data);
  }
  createGroup(data: CreateParameter): Observable<number[]> {
    return this.http.post<number[]>('/api/Param/CreateParam',data);
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>('/api/Param/DeleteDescriptionParam/'+id);
  }
  deleteGroup(idPlanDetail: number, ids: number[]): Observable<void> {
    const temp:DeleteParameter={
      Ids:ids
    };
    return this.http.delete<void>('/api/Param/DeleteParam/'+idPlanDetail,{body:temp});
  }
  update(id: number, data: UpdateDescriptionParameter): Observable<void> {
    return this.http.put<void>('/api/Param/UpdateDescriptionParam/'+id,data);
  }
  updateGroup(idPlanDetail: number, data: UpdateParameter): Observable<void> {
    return this.http.put<void>('/api/Param/UpdateParam/'+idPlanDetail,data);
  }

  showAllParam(): Observable<ParamSelectItem[]> {
    return this.http.get<ParamSelectItem[]>('/api/Param/ShowParentParams');
  }

}
