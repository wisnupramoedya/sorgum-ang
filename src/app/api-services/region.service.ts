import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchRequest } from '../common/app.model';
import { RegionSearchResponse, CreateRegionDto, UpdateRegionDto, RegionsItemMinimalDto } from '../common/region.model';
import { RegionMockService } from '../mock-services/region-mock.service';
import { UtilityService } from '../services/utility.service';


export interface RegionServiceInterface {
  // create(data: GreenHouseCreateForm): Observable<CreateResponse<number>>;
  search(data: SearchRequest): Observable<RegionSearchResponse>;
  add(data: CreateRegionDto):Observable<number>;
  update(id:number,data:UpdateRegionDto):Observable<void>;
  delete(id:number):Observable<void>;
  showMinimal(land_id:number):Observable<RegionsItemMinimalDto[]>;

}

@Injectable({
  providedIn: 'root',
  useFactory: (p: any[], h: HttpClient, u: UtilityService) => {
    if (p[0] === true) {
      return new RegionMockService();
    } else {
      return new RegionService(h, u);
    }
  },
  deps: ['mocking', HttpClient, UtilityService],
})
export class RegionService implements RegionServiceInterface{

  constructor(
    private http: HttpClient,
    private utilityService: UtilityService
  ) { }
  showMinimal(land_id: number): Observable<RegionsItemMinimalDto[]> {
    return this.http.get<RegionsItemMinimalDto[]>('/api/RegionCrud/ShowRegionMinimal/'+land_id);
  }
  search(data: SearchRequest): Observable<RegionSearchResponse> {
    const params = new HttpParams({
      fromObject: {...data}
    });
    return this.http.get<RegionSearchResponse>('/api/RegionCrud/Search',{params: params});
  }
  add(data: CreateRegionDto): Observable<number> {
    return this.http.post<number>('/api/RegionCrud/AddRegion',data);
  }
  update(id: number, data: UpdateRegionDto): Observable<void> {
    return this.http.put<void>('/api/RegionCrud/UpdateRegion/'+id,data);
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>('/api/RegionCrud/DeleteRegion/'+id);
  }
}
