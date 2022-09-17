import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  ReactiveFormsModule,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzModalModule, NzModalRef } from 'ng-zorro-antd/modal';
import { HttpClient } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd/message';
import {
  NzUploadChangeParam,
  NzUploadFile,
  NzUploadModule,
} from 'ng-zorro-antd/upload';
import { Observable, Observer, tap } from 'rxjs';
import { LandService } from 'src/app/api-services/land.service';
import { NzNotificationModule, NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-create-land',
  standalone: true,
  templateUrl: './create-land.component.html',
  styleUrls: ['./create-land.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzModalModule,
    NzGridModule,
    NzIconModule,
    NzListModule,
    NzUploadModule,
    NzNotificationModule
  ],
})
export class CreateLandComponent implements OnInit {
  form: FormGroup = this.fb.nonNullable.group({
    Name: this.fb.nonNullable.control('', {
      validators: [Validators.required],
    }),
    Code: this.fb.nonNullable.control('', {
      validators: [Validators.required],
    }),
    Photo: this.fb.control(null),
    Address: this.fb.nonNullable.control(''),
    CordinateLand: this.fb.nonNullable.control(''),
  });
  isSubmitLoading = false;
  fileList:NzUploadFile[]=[];
  constructor(
    private modal: NzModalRef,
    private fb: UntypedFormBuilder,
    private msg: NzMessageService,
    private http: HttpClient,
    private landService:LandService,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {}
  submitForm(): void {
    console.log(this.form.valid, this.form.value);
    
    if(this.form.valid){
      this.landService.add(this.form.value)
      .pipe(
        tap(()=>this.notification.create(
          'success',
          'Sukses',
          'Submit lahan baru berhasil.'
        ))
      ).subscribe(id=>this.modal.close(id));

    }
  }
  destroyModal(): void {
    this.modal.close();
  }
  // handleChange({ file, fileList }: NzUploadChangeParam): void {
  //   // const status = file.status;
  //   // if (event.target.files.length > 0) {
  //   //   const file = event.target.files[0];
  //   //   this.form.controls.Photo.setValue(file);
  //   // }
  //   // if (status !== 'uploading') {
  //   //   console.log(file, fileList);
  //   // }
  //   // if (status === 'done') {
  //   //   this.msg.success(`${file.name} file uploaded successfully.`);
  //   // } else if (status === 'error') {
  //   //   this.msg.error(`${file.name} file upload failed.`);
  //   // }
  // }
  getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
  beforeUpload = (
    file: NzUploadFile,
    _fileList: NzUploadFile[]
  ): boolean =>
    {
      const isJpgOrPng =
        file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.msg.error('You can only upload JPG file!');
        // observer.complete();
        return false;
      }
      const isLt2M = file.size! / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.msg.error('Image must smaller than 2MB!');
        // observer.complete();
        return false;
      }
      // observer.next(isJpgOrPng && isLt2M);
      // observer.next(false);
      // observer.complete();
      this.fileList = this.fileList.concat(file);
     console.log(file);
     
      this.form.controls['Photo'].setValue(file);
      console.log(this.form.controls['Photo'].value);
     console.log(file.originFileObj!);
      
      return false;

    }
    handlePreview = async (file: NzUploadFile): Promise<void> => {
      if (!file.url && !file['preview']) {
        file['preview'] = await this.getBase64(file.originFileObj!);
      }
    };

    // onFileChange(event: any) {
    //   //Todo validation file size
    //   if (event.target.files.length > 0) {
    //     const file = event.target.files[0];
    //     this.form.controls.Photo.setValue(file);
    //   }
    // }
}
