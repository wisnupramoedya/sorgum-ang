import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpEvent, HttpEventType, HttpRequest, HttpResponse } from '@angular/common/http';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { NzModalModule, NzModalRef } from 'ng-zorro-antd/modal';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzUploadChangeParam, NzUploadModule } from 'ng-zorro-antd/upload';
import { GreenHouseService } from 'src/app/api-services/green-house.service';
import { CreateResponse } from 'src/app/common/app.model';

@Component({
  selector: 'app-modal-add-greenhouse',
  templateUrl: './modal-add-greenhouse.component.html',
  styleUrls: ['./modal-add-greenhouse.component.scss'],
  standalone:true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports:[
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    NzListModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    NzCardModule,
    NzModalModule,
    NzPaginationModule,
    NzIconModule,
    NzUploadModule,
    NzMessageModule,
    NzGridModule,
    NzBreadCrumbModule
  ]
})
export class ModalAddGreenhouseComponent implements OnInit {
  form!:UntypedFormGroup;
  isSubmitLoading=false;
  constructor(
    private modal: NzModalRef,
    private fb:UntypedFormBuilder,
    private msg: NzMessageService,
    private http: HttpClient,
    private greenhouseService: GreenHouseService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }
  initForm():void{
    this.form = this.fb.group({
      Name:['',[Validators.required]],
      Code:['',[Validators.required]],
      Address:['',[Validators.required]],
      Photo:[null],
    });
  }
  onFileChange(event: any) {
    //Todo validation file size
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.controls.Photo.setValue(file);
    }
  }
  destroyModal(): void {
    this.modal.destroy();
  }
  
  submitForm():void{
    this.isSubmitLoading = true;
    this.greenhouseService.create(this.form.value)
    .subscribe(
      (res:CreateResponse<number>)=>{
        this.isSubmitLoading=false;
        this.modal.destroy(res.id);
      },
      err=>{
        this.isSubmitLoading=false;
        console.error(err);
      }
    )
    ;
  }
  
}
