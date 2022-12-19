import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { PlanServiceInterface } from '../api-services/plan.service';
import { SearchRequest } from '../common/app.model';
import { CreatePlanDto, ParameterReadPlanDto, PlanSearchResponse, ReadPlanDto, UpatePlanDto } from '../common/plan.model';

@Injectable({
  providedIn: 'root'
})
export class PlanMockService implements PlanServiceInterface{

  constructor() { }
  showPlans(): Observable<ReadPlanDto[]> {
    const p: ReadPlanDto[] = [
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
  add(data: CreatePlanDto): Observable<number> {
    return of(1);
  }
  update(id: number, data: UpatePlanDto): Observable<void> {
    return of(void 0);
  }
  delete(id: number): Observable<void> {
    return of(void 0);
  }
  search(data: SearchRequest): Observable<PlanSearchResponse> {

    const temp: ReadPlanDto[]=[
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
