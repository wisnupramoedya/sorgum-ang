import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchRequest } from '../common/app.model';
import { CreatePlanDetailDto, PlanDetailSearchResponse, ReadPlanDetailDto, UpatePlanDetailDto } from '../common/plan-detail.model';
import { PlanDetailMockService } from '../mock-services/plan-detail-mock.service';
import { UtilityService } from '../services/utility.service';

export interface PlanDetailServiceInterface {
  // create(data: GreenHouseCreateForm): Observable<CreateResponse<number>>;
  showPlanDetails():Observable<ReadPlanDetailDto[]>;
  search(data: SearchRequest): Observable<PlanDetailSearchResponse>;
  add(data: CreatePlanDetailDto):Observable<number>;
  update(id:number,data:UpatePlanDetailDto):Observable<void>;
  delete(id:number):Observable<void>;
}


@Injectable({
  providedIn: 'root',
  useFactory: (p: any[], h: HttpClient, u: UtilityService) => {
    if (p[0] === true) {
      return new PlanDetailMockService();
    } else {
      return new PlanDetailService(h, u);
    }
  },
  deps: ['mocking', HttpClient, UtilityService],
})
export class PlanDetailService implements PlanDetailServiceInterface{

  constructor(
    private http: HttpClient,
    private utilityService: UtilityService
  ) {}
  delete(id: number): Observable<void> {
    return this.http.delete<void>('/api/PlanDetailCrud/DeletePlanDetail/'+id);
  }
  update(id: number, data: UpatePlanDetailDto): Observable<void> {
    return this.http.put<void>('/api/PlanDetailCrud/UpdatePlanDetail/'+id,data);
  }
  add(data: CreatePlanDetailDto): Observable<number> {
    return this.http.post<number>('/api/PlanDetailCrud/AddPlanDetail',data);
  }
  search(data: SearchRequest): Observable<PlanDetailSearchResponse> {
    const params = new HttpParams({
      fromObject: {...data}
    });
    return this.http.get<PlanDetailSearchResponse>('api/PlanDetailCrud/Search',{params:params});
  }
  showPlanDetails():Observable<ReadPlanDetailDto[]>{
    return this.http.get<ReadPlanDetailDto[]>('api/PlanDetailCrud/ShowPlanDetails');

  }
}
