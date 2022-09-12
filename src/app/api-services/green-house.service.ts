import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GreenHouseAPI } from '../apis/greenhouse.api';
import {
  AppResponse,
  CreateResponse,
  SearchRequest,
} from '../common/app.model';
import {
  GreenHouseCreateForm,
  GreenHouseDetailDto,
  GreenHouseGraphParameterDto,
  GreenHouseGraphParameterRequest,
  GreenHouseParameterOptionDto,
  GreenHousePlantOptionDto,
  GreenHouseSearchResponse,
  InitDataGreenhouseForm,
} from '../common/greenhouse.model';
import { GreenhouseMockService } from '../mock-services/greenhouse-mock.service';
import { UtilityService } from '../services/utility.service';

export interface GreenHouseServiceInterface {
  create(data: GreenHouseCreateForm): Observable<CreateResponse<number>>;
  search(data: SearchRequest): Observable<GreenHouseSearchResponse>;
  initDataGreenHouse(data: InitDataGreenhouseForm): Observable<AppResponse>;
  getAllPlants(): Observable<GreenHousePlantOptionDto[]>;
  getAllParameters(): Observable<GreenHouseParameterOptionDto[]>;
  getGreenHouseById(id: number): Observable<GreenHouseDetailDto>;
  getGraphParamater(
    data: GreenHouseGraphParameterRequest
  ): Observable<GreenHouseGraphParameterDto[]>;
}

@Injectable({
  providedIn: 'root',
  useFactory: (p: any[], h: HttpClient, u: UtilityService) => {
    if (p[0] === true) {
      return new GreenhouseMockService();
    } else {
      return new GreenHouseService(h, u);
    }
  },
  deps: ['mocking', HttpClient, UtilityService],
})
export class GreenHouseService {
  constructor(
    private http: HttpClient,
    private utilityService: UtilityService
  ) {}

  create(data: GreenHouseCreateForm): Observable<CreateResponse<number>> {
    return this.http.post<CreateResponse<number>>(
      GreenHouseAPI.Create,
      this.utilityService.convertModelToFormData(data, null, null)
    );
  }
  search(data: SearchRequest): Observable<GreenHouseSearchResponse> {
    return this.http.get<GreenHouseSearchResponse>(GreenHouseAPI.Search, {
      params: this.utilityService.convertModelToHttpParams(data),
    });
  }
  initDataGreenHouse(data: InitDataGreenhouseForm): Observable<AppResponse> {
    return this.http.post<AppResponse>(GreenHouseAPI.InitDataGreenHouse, data);
    // return this.http.post<AppResponse>(GreenHouseAPI.InitDataGreenHouse, {
    //   params: this.utilityService.convertModelToFormData(data, null, null),
    // });
  }
  getAllPlants(): Observable<GreenHousePlantOptionDto[]> {
    return this.http.get<GreenHousePlantOptionDto[]>(
      GreenHouseAPI.GetAllPlants
    );
  }
  getAllParameters(): Observable<GreenHouseParameterOptionDto[]> {
    return this.http.get<GreenHouseParameterOptionDto[]>(
      GreenHouseAPI.GetAllParameters
    );
  }
  getGreenHouseById(id: number): Observable<GreenHouseDetailDto> {
    return this.http.get<GreenHouseDetailDto>(GreenHouseAPI.GetGreenHouseById, {
      params: { Id: id },
    });
  }
  getGraphParamater(
    data: GreenHouseGraphParameterRequest
  ): Observable<GreenHouseGraphParameterDto[]> {
    const p = new Date(data.ChosenDate.setHours(0, 0, 0, 0));
    data.ChosenDate = new Date(Date.parse(p.toUTCString())); //new Date(Date.parse(data.ChosenDate.toUTCString()));
    return this.http.get<GreenHouseGraphParameterDto[]>(
      GreenHouseAPI.GraphParameter,
      {
        params: this.utilityService.convertModelToHttpParams(data),
      }
    );
  }
}
