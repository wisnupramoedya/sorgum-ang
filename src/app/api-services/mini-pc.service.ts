import { Injectable } from '@angular/core';
import {SearchRequest} from "../common/app.model";
import {map, Observable, of} from "rxjs";
import {
  AddMiniPcDto,
  MiniPcItemDto,
  MiniPcItemMinimalDto,
  MiniPcSearchResponse, MiniPcsIdentity,
  UpdateMiniPcDto
} from "../common/minipc.model";
import {HttpClient} from "@angular/common/http";
import {UtilityService} from "../services/utility.service";
import {MiniPcMockService} from "../mock-services/mini-pc-mock.service";
import { MiniPcItem2DTO } from '../common/minipc.model';

export interface MiniPcServiceInterface {
  search(data: SearchRequest, land_id?:number): Observable<MiniPcSearchResponse>;
  add(data: AddMiniPcDto):Observable<number>;
  update(id:number,data:UpdateMiniPcDto):Observable<void>;
  delete(id:number):Observable<void>;
  showMinimal(land_id:number):Observable<MiniPcItemMinimalDto[]>;
  showOverviewMiniPc(land_id:number, data:MiniPcsIdentity):Observable<MiniPcItemDto[]>;
  showMiniPcInALand(land_id:number): Observable<MiniPcItem2DTO[]>;
}

@Injectable({
  providedIn: 'root',
  useFactory: (p: any[], h: HttpClient, u: UtilityService) => {
    if (p[0] === true) {
      return new MiniPcMockService();
    } else {
      return new MiniPcService(h, u);
    }
  },
  deps: ['mocking', HttpClient, UtilityService]
})
export class MiniPcService implements MiniPcServiceInterface{

  constructor(
    private http: HttpClient,
    private utilityService: UtilityService
  ) {}
  showMiniPcInALand(land_id: number): Observable<MiniPcItem2DTO[]> {
    return this.http.get<MiniPcItem2DTO[]>('/api/MiniPcsCrud/ShowMiniPcInALand/'+land_id);
  }

  add(data: AddMiniPcDto): Observable<number> {
    return this.http.post<number>('/api/MiniPCsCrud/AddMiniPc',data);
  }

  delete(id: number): Observable<void> {
    throw new Error("not implemented");
  }

  search(data: SearchRequest, land_id?: number): Observable<MiniPcSearchResponse> {
    throw new Error("not implemented");
  }

  showMinimal(land_id: number): Observable<MiniPcItemMinimalDto[]> {
    throw new Error("not implemented");
  }

  showOverviewMiniPc(land_id: number, data: MiniPcsIdentity): Observable<MiniPcItemDto[]> {
    throw new Error("not implemented");
  }

  update(id: number, data: UpdateMiniPcDto): Observable<void> {
    throw new Error("not implemented");
  }
}
