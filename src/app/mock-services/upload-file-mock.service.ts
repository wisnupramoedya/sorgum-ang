import { Injectable } from '@angular/core';
import {UploadFileServiceInterface} from "../api-services/upload-file.service";
import {UploadPathResponse} from "../common/upload.model";
import {Observable, of} from "rxjs";

@Injectable()
export class UploadFileMockService implements UploadFileServiceInterface {

  constructor() { }

  upload(data: FormData): Observable<UploadPathResponse[]> {
    const response: UploadPathResponse[] = [
      {
        "Id": 0,
        "Path": "rust-of-sorghum-sorghum-1.jpg"
      },
    ];
    return of(response);
  }

}
