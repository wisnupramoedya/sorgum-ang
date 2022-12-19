import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { PlanDetailServiceInterface } from '../api-services/plan-detail.service';
import { SearchRequest } from '../common/app.model';
import { CreatePlanDetailDto, ParameterReadPlanDetailDto, PlanDetailSearchResponse, ReadPlanDetailDto, UpatePlanDetailDto } from '../common/plan-detail.model';

@Injectable({
  providedIn: 'root'
})
export class PlanDetailMockService implements PlanDetailServiceInterface{

  constructor() { }
  showPlanDetails(): Observable<ReadPlanDetailDto[]> {
    const p: ReadPlanDetailDto[] = [
      {
        Description:'-',
        Id:1,
        LatinName:'-',
        Name:'Mangga',
        Parameters:[]
      },
      {
        Description:'-',
        Id:2,
        LatinName:'-',
        Name:'Pisang',
        Parameters:[]
      },
      {
        Description:'-',
        Id:3,
        LatinName:'-',
        Name:'Jeruk',
        Parameters:[]
      },
    ];
    return of(p)
  }
  add(data: CreatePlanDetailDto): Observable<number> {
    return of(1);
  }
  update(id: number, data: UpatePlanDetailDto): Observable<void> {
    return of(void 0);
  }
  delete(id: number): Observable<void> {
    return of(void 0);
  }
  search(data: SearchRequest): Observable<PlanDetailSearchResponse> {

    const temp: ReadPlanDetailDto[]=[
      {
        Name:'Sorghum citayam',
        LatinName:'SCTY',
        Description:'Varietas dari AI',
        Id:1,
        Parameters:[
          {
            Id:1,
            ParentTypeId:1,
            Descriptions:[
              {
                Description:'Terlalu asam',
                Id:2,
                MaxValue:1,
                MinValue:4,
                Color:"#005322"
              },
              {
                Description:'Optimal',
                Id:1,
                MaxValue:4,
                MinValue:9,
                Color:"#0f9322"
              },
              {
                Description:'Terlalu basa',
                Id:3,
                MaxValue:14,
                MinValue:9,
                Color:"#f05822"
              }
            ]
          }
        ]
      }
    ];
    return of({
      Data: temp,
      NTotal: temp.length
    }).pipe(map(x=>{
      x.Data = x.Data.filter(y=>y.Name.toLowerCase().includes(data.Search.toLowerCase()) || y.LatinName.toLowerCase().includes(data.Search.toLowerCase()));
      x.NTotal = x.Data.length;
      return x;
    }));
  }
}
