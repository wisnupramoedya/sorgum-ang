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
} from '../common/planparameter.model';
import { PlanParameterMockService } from '../mock-services/plan-parameter-mock.service';
import { UtilityService } from '../services/utility.service';


export interface PlanParameterServiceInterface{
  create(data:CreateDescriptionParameter):Observable<number>;
  createGroup(data:CreateParameter):Observable<number[]>;
  delete(id:number):Observable<void>;
  deleteGroup(idPlan:number, ids:number[]):Observable<void>;
  update(id:number, data:UpdateDescriptionParameter):Observable<void>;
  updateGroup(idPlan:number, data: UpdateParameter):Observable<void>;
  showAllParam():Observable<ParamSelectItem[]>;
}

@Injectable({
  providedIn: 'root',
  useFactory: (p: any[], h: HttpClient, u: UtilityService) => {
    if (p[0] === true) {
      return new PlanParameterMockService();
    } else {
      return new PlanParameterService(h, u);
    }
  },
  deps: ['mocking', HttpClient, UtilityService],
})
export class PlanParameterService implements PlanParameterServiceInterface{

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
  deleteGroup(idPlan: number, ids: number[]): Observable<void> {
    const temp:DeleteParameter={
      Ids:ids
    };
    return this.http.delete<void>('/api/Param/DeleteParam/'+idPlan,{body:temp});
  }
  update(id: number, data: UpdateDescriptionParameter): Observable<void> {
    return this.http.put<void>('/api/Param/UpdateDescriptionParam/'+id,data);
  }
  updateGroup(idPlan: number, data: UpdateParameter): Observable<void> {
    return this.http.put<void>('/api/Param/UpdateParam/'+idPlan,data);
  }

  showAllParam(): Observable<ParamSelectItem[]> {
    return this.http.get<ParamSelectItem[]>('/api/Param/ShowParentParams');
  }

}
