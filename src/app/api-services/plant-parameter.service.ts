import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateDescriptionParameter, CreateParameter, UpdateDescriptionParameter, UpdateParameter } from '../common/PlantParameter.model';
import { PlantParameterMockService } from '../mock-services/plant-parameter-mock.service';
import { UtilityService } from '../services/utility.service';


export interface PlantParameterServiceInterface{
  create(data:CreateDescriptionParameter):Observable<number>;
  createGroup(data:CreateParameter):Observable<number[]>;
  delete(id:number):Observable<void>;
  deleteGroup(idPlant:number, ids:number[]):Observable<void>;
  update(id:number, data:UpdateDescriptionParameter):Observable<void>;
  updateGroup(idPlant:number, data: UpdateParameter):Observable<void>;
}

@Injectable({
  providedIn: 'root',
  useFactory: (p: any[], h: HttpClient, u: UtilityService) => {
    if (p[0] === true) {
      return new PlantParameterMockService();
    } else {
      return new PlantParameterService(h, u);
    }
  },
  deps: ['mocking', HttpClient, UtilityService],
})
export class PlantParameterService implements PlantParameterServiceInterface{

  constructor(
    private http: HttpClient,
    private utilityService: UtilityService
  ) { }
  create(data: CreateDescriptionParameter): Observable<number> {
    throw new Error('Method not implemented.');
  }
  createGroup(data: CreateParameter): Observable<number[]> {
    throw new Error('Method not implemented.');
  }
  delete(id: number): Observable<void> {
    throw new Error('Method not implemented.');
  }
  deleteGroup(idPlant: number, ids: number[]): Observable<void> {
    throw new Error('Method not implemented.');
  }
  update(id: number, data: UpdateDescriptionParameter): Observable<void> {
    throw new Error('Method not implemented.');
  }
  updateGroup(idPlant: number, data: UpdateParameter): Observable<void> {
    throw new Error('Method not implemented.');
  }
  
}
