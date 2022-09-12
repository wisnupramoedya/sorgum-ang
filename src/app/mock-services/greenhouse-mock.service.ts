import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { GreenHouseServiceInterface } from '../api-services/green-house.service';
import { GreenHouseAPI } from '../apis/greenhouse.api';
import {
  AppResponse,
  CreateResponse,
  SearchRequest,
} from '../common/app.model';
import {
  GreenHouseCreateForm,
  GreenHouseDetailDto,
  GreenHouseDto,
  GreenHouseGraphParameterDto,
  GreenHouseGraphParameterRequest,
  GreenHouseParameterOptionDto,
  GreenHousePlantOptionDto,
  GreenHouseSearchResponse,
  InitDataGreenhouseForm,
  IotsDto,
  PlantsDto,
} from '../common/greenhouse.model';

@Injectable()
export class GreenhouseMockService implements GreenHouseServiceInterface {
  constructor() {
    console.log('using service from mock greenhouse');

  }
  create(data: GreenHouseCreateForm): Observable<CreateResponse<number>> {
    return of({
      message: 'New land has been created',
      id: 1
    })
  }
  initDataGreenHouse(data: InitDataGreenhouseForm): Observable<AppResponse> {
    return of({
      message: 'Get data greenhouse succeeded',
    });
  }
  getAllPlants(): Observable<GreenHousePlantOptionDto[]> {
    throw new Error('Method not implemented.');
    
  }
  getAllParameters(): Observable<GreenHouseParameterOptionDto[]> {
    throw new Error('Method not implemented.');
  }
  getGraphParamater(
    data: GreenHouseGraphParameterRequest
  ): Observable<GreenHouseGraphParameterDto[]> {
    throw new Error('Method not implemented.');
  }
  search(data: SearchRequest): Observable<GreenHouseSearchResponse> {
    const dataresponse: GreenHouseDto[] = [
      {
        address: 'jalan suramasu',
        code: 'faff',
        id: 1,
        name: 'gh sorgum',
        photo: [],
      },
    ];
    const resp: GreenHouseSearchResponse = {
      data: dataresponse,
      nTotal: dataresponse.length,
    };
    return of(resp);
  }

  getGreenHouseById(id: number): Observable<GreenHouseDetailDto> {
    const its: IotsDto[] = [
      {
        code: 'yy',
        connected: true,
        id: 90,
        name: 'hussen',
        secret: 'jgjg',
      },
      {
        code: 'mm',
        connected: false,
        id: 98,
        name: 'manal',
        secret: 'ma',
      },
    ];
    const plt: PlantsDto[] = [
      {
        condition: {
          rFanMode: 9,
          rFanTime: 15,
          rLampState: 26,
          rServoTime: 30,
          rWaterPumpTime: 35,
        },
        id: 38,
        latinName: 'emo',
        n: 40,
        name: 'am',
        plantId: 44,
      },
    ];
    const t: GreenHouseDetailDto = {
      address: 'uuuuuuu',
      code: 'jj',
      id: 88,
      iots: its,
      name: 'ali',
      photo: [],
      plants: plt,
    };
    return of(t);
  }
}
