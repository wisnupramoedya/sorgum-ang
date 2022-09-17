import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchRequest } from '../common/app.model';
import { CreateLandDto, LandSearchResponse, UpdateLandDto } from '../common/land.model';
import { LandMockService } from '../mock-services/land-mock.service';
import { UtilityService } from '../services/utility.service';



export interface LandServiceInterface {
  search(data: SearchRequest): Observable<LandSearchResponse>;
  add(data: CreateLandDto):Observable<number>;
  update(id:number,data:UpdateLandDto):Observable<void>;
  delete(id:number):Observable<void>;
}

@Injectable({
  providedIn: 'root',
  useFactory: (p: any[], h: HttpClient, u: UtilityService) => {
    if (p[0] === true) {
      return new LandMockService(u);
    } else {
      return new LandService(h, u);
    }
  },
  deps: ['mocking', HttpClient, UtilityService],
})
export class LandService implements LandServiceInterface{

  constructor(
    private http: HttpClient,
    private utilityService: UtilityService
  ) {
    console.log("using land service");

  }
  update(id: number, data: UpdateLandDto): Observable<void> {
    return this.http.put<void>('/api/LandCrud/UpdateLand/'+id,data);
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>('/api/LandCrud/DeleteLand/'+id);
  }
  add(data: CreateLandDto): Observable<number> {
    return this.http.post<number>('/api/LandCrud/AddLand',this.utilityService.convertModelToFormData(data, null, null));
  }
  search(data: SearchRequest): Observable<LandSearchResponse> {
    const params = new HttpParams({
      fromObject: {...data}
    });
    return this.http.get<LandSearchResponse>('/api/LandCrud/Search',{params: params});
  }
  
}
