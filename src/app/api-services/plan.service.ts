import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchRequest } from '../common/app.model';
import { CreatePlanDto, PlanSearchResponse, ReadPlanDto, UpatePlanDto } from '../common/plan.model';
import { PlanMockService } from '../mock-services/plan-mock.service';
import { UtilityService } from '../services/utility.service';

export interface PlanServiceInterface {
  // create(data: GreenHouseCreateForm): Observable<CreateResponse<number>>;
  showPlans():Observable<ReadPlanDto[]>;
  search(data: SearchRequest): Observable<PlanSearchResponse>;
  add(data: CreatePlanDto):Observable<number>;
  update(id:number,data:UpatePlanDto):Observable<void>;
  delete(id:number):Observable<void>;
}


@Injectable({
  providedIn: 'root',
  useFactory: (p: any[], h: HttpClient, u: UtilityService) => {
    if (p[0] === true) {
      return new PlanMockService();
    } else {
      return new PlanService(h, u);
    }
  },
  deps: ['mocking', HttpClient, UtilityService],
})
export class PlanService implements PlanServiceInterface{

  constructor(
    private http: HttpClient,
    private utilityService: UtilityService
  ) {}
  delete(id: number): Observable<void> {
    return this.http.delete<void>('/api/PlanCrud/DeletePlan/'+id);
  }
  update(id: number, data: UpatePlanDto): Observable<void> {
    return this.http.put<void>('/api/PlanCrud/UpdatePlan/'+id,data);
  }
  add(data: CreatePlanDto): Observable<number> {
    return this.http.post<number>('/api/PlanCrud/AddPlan',data);
  }
  search(data: SearchRequest): Observable<PlanSearchResponse> {
    const params = new HttpParams({
      fromObject: {...data}
    });
    return this.http.get<PlanSearchResponse>('api/PlanCrud/Search',{params:params});
  }
  showPlans():Observable<ReadPlanDto[]>{
    return this.http.get<ReadPlanDto[]>('api/PlanCrud/ShowPlans');

  }
}
