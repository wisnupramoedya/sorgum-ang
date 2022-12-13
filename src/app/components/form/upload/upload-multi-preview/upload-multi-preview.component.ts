import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NzUploadFile, NzUploadModule} from "ng-zorro-antd/upload";
import {NzMessageService} from "ng-zorro-antd/message";
import {UploadFileService} from "../../../../api-services/upload-file.service";
import {UploadPathResponse} from "../../../../common/upload.model";
import {ReactiveFormsModule} from "@angular/forms";
import {NzFormModule} from "ng-zorro-antd/form";

@Component({
  standalone: true,
  selector: 'app-upload-multi-preview',
  templateUrl: './upload-multi-preview.component.html',
  styleUrls: ['./upload-multi-preview.component.scss'],
  imports: [
    NzUploadModule,
  ]
})
export class UploadMultiPreviewComponent implements OnInit {
  @Input() title: string = 'title';
  @Output() uploadEmitter = new EventEmitter();

  fileList: NzUploadFile[] = [];

  constructor(
    private msg: NzMessageService,
    private uploadFileService: UploadFileService
  ) { }

  ngOnInit(): void {
  }

  beforeUpload = (file: NzUploadFile): boolean => {
    const formData = new FormData();
    formData.append("DiseaseImage", file as any);
    this.uploadFileService.upload(formData)
      .subscribe(
        (res: UploadPathResponse[]) => {
          this.uploadEmitter.emit(res);
        }
      );

    this.fileList = [...this.fileList, file];
    console.log(this.fileList)
    return false;
  }

  setFile(file: NzUploadFile, path: string): NzUploadFile {
    file.url = path;
    return file;
  }
}
