import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { PlantServiceInterface } from '../api-services/plant.service';
import { SearchRequest } from '../common/app.model';
import { CreatePlantDto, ParameterReadPlantDto, PlantSearchResponse, ReadPlantDto, UpatePlantDto } from '../common/plant.model';

@Injectable({
  providedIn: 'root'
})
export class PlantMockService implements PlantServiceInterface{

  constructor() { }
  showPlants(): Observable<ReadPlantDto[]> {
    const p:ReadPlantDto[]=[
      {
        Description:'-',
        Id:1,
        LatinName:'-',
        Name:'ansa',
        Parameters:[]
      },
    ];
    return of(p)
  }
  add(data: CreatePlantDto): Observable<number> {
    return of(1);
  }
  update(id: number, data: UpatePlantDto): Observable<void> {
    return of(void 0);
  }
  delete(id: number): Observable<void> {
    return of(void 0);
  }
  search(data: SearchRequest): Observable<PlantSearchResponse> {

    const temp: ReadPlantDto[]=[
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
