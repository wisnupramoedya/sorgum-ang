import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PlantParameterServiceInterface } from '../api-services/plant-parameter.service';
import {
  CreateDescriptionParameter,
  CreateParameter,
  ParamSelectItem,
  UpdateDescriptionParameter,
  UpdateParameter
} from '../common/plantparameter.model';

@Injectable()
export class PlantParameterMockService implements PlantParameterServiceInterface{

  constructor() { }
  create(data: CreateDescriptionParameter): Observable<number> {
    return of(100);
  }
  createGroup(data: CreateParameter): Observable<number[]> {
    const t:number[] = [];
    for (let index = 0; index < data.Descriptions.length; index++) {
      const element = data.Descriptions[index];
      t.push(index*9);
    }
    return of(t);
  }
  delete(id: number): Observable<void> {
    return of(void 0);
  }
  deleteGroup(idPlant: number, ids: number[]): Observable<void> {
    return of(void 0);
  }
  update(id: number, data: UpdateDescriptionParameter): Observable<void> {
    return of(void 0);
  }
  updateGroup(idPlant: number, data: UpdateParameter): Observable<void> {
    return of(void 0);
  }

  showAllParam(): Observable<ParamSelectItem[]> {
    const paramItems: ParamSelectItem[] = [
      {Id: 1, Name: "Ph"},
      {Id: 2, Name: "Kelembapan"},
      {Id: 3, Name: "Suhu Tanah"},
    ]
    return of(paramItems);
  }

}
