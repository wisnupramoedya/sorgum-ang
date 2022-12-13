import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {UploadPathResponse} from "../common/upload.model";
import {HttpClient} from "@angular/common/http";
import {UtilityService} from "../services/utility.service";
import {MiniPcMockService} from "../mock-services/mini-pc-mock.service";
import {UploadFileMockService} from "../mock-services/upload-file-mock.service";

export interface UploadFileServiceInterface {
  upload(data: FormData): Observable<UploadPathResponse[]>;
}

@Injectable({
  providedIn: 'root',
  useFactory: (p: any[], h: HttpClient, u: UtilityService) => {
    if (p[0] === true) {
      console.log("uploadfilemoc")
      return new UploadFileMockService();
    } else {
      return new UploadFileService(h, u);
    }
  },
  deps: ['mocking', HttpClient, UtilityService]
})
export class UploadFileService implements UploadFileServiceInterface {

  constructor(
    private http: HttpClient,
    private utilityService: UtilityService
  ) { }

  upload(data: FormData): Observable<UploadPathResponse[]> {
    return this.http.post<UploadPathResponse[]>('/api/DiseaseImage/AddImageDisease', data);
  }
}
