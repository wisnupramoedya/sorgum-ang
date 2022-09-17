import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchRequest } from '../common/app.model';
import { CreatePlantDto, PlantSearchResponse, UpatePlantDto } from '../common/plant.model';
import { PlantMockService } from '../mock-services/plant-mock.service';
import { UtilityService } from '../services/utility.service';

export interface PlantServiceInterface {
  // create(data: GreenHouseCreateForm): Observable<CreateResponse<number>>;
  search(data: SearchRequest): Observable<PlantSearchResponse>;
  add(data: CreatePlantDto):Observable<number>;
  update(id:number,data:UpatePlantDto):Observable<void>;
  delete(id:number):Observable<void>;
}


@Injectable({
  providedIn: 'root',
  useFactory: (p: any[], h: HttpClient, u: UtilityService) => {
    if (p[0] === true) {
      return new PlantMockService();
    } else {
      return new PlantService(h, u);
    }
  },
  deps: ['mocking', HttpClient, UtilityService],
})
export class PlantService implements PlantServiceInterface{

  constructor(
    private http: HttpClient,
    private utilityService: UtilityService
  ) {}
  delete(id: number): Observable<void> {
    return this.http.delete<void>('/api/PlantCrud/DeletePlant/'+id);
  }
  update(id: number, data: UpatePlantDto): Observable<void> {
    return this.http.put<void>('/api/PlantCrud/UpdatePlant/'+id,data);
  }
  add(data: CreatePlantDto): Observable<number> {
    return this.http.post<number>('/api/PlantCrud/AddPlant',data);
  }
  search(data: SearchRequest): Observable<PlantSearchResponse> {
    const params = new HttpParams({
      fromObject: {...data}
    });
    return this.http.get<PlantSearchResponse>('api/PlantCrud/Search',{params:params});
  }
}
