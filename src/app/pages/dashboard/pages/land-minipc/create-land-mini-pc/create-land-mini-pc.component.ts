import {Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormGroup, ReactiveFormsModule, UntypedFormBuilder, Validators} from "@angular/forms";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzModalModule, NzModalRef} from "ng-zorro-antd/modal";
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzListModule} from "ng-zorro-antd/list";
import {NzNotificationModule, NzNotificationService} from "ng-zorro-antd/notification";
import {NzSelectModule} from "ng-zorro-antd/select";
import {RegionsItemMinimalDto} from "../../../../../common/region.model";
import {NzMessageService} from "ng-zorro-antd/message";
import {RegionService} from "../../../../../api-services/region.service";
import {MicrocontrollerService} from "../../../../../api-services/microcontroller.service";
import {tap} from "rxjs";

@Component({
  selector: 'app-create-land-mini-pc',
  standalone: true,
  templateUrl: './create-land-mini-pc.component.html',
  styleUrls: ['./create-land-mini-pc.component.scss'],
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
    NzNotificationModule,
    NzSelectModule
  ],
})
export class CreateLandMiniPcComponent implements OnInit {
  @Input() land_id!:number;
  isSubmitLoading = false;
  regions:RegionsItemMinimalDto[]=[];

  form: FormGroup = this.fb.nonNullable.group({
    Name: this.fb.nonNullable.control('', {
      validators: [Validators.required],
    }),
    Description: this.fb.nonNullable.control('', {
      validators: [Validators.required],
    }),
    RegionId: this.fb.nonNullable.control(0,{
      validators: [Validators.required],
    }),
  });

  constructor(
    private modal: NzModalRef,
    private fb: UntypedFormBuilder,
    private msg: NzMessageService,
    private regionService:RegionService,
    private miniPcService:MicrocontrollerService,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.regionService.showMinimal(this.land_id)
      .subscribe(x=>this.regions=x)
  }
  submitForm(): void {
    console.log(this.form.valid, this.form.value);

    if(this.form.valid){
      this.miniPcService.add(this.form.value)
        .pipe(
          tap(()=>this.notification.create(
            'success',
            'Sukses',
            'Submit mini PC baru berhasil.'
          ))
        ).subscribe(id=>this.modal.close(id));

    }
  }
  destroyModal(): void {
    this.modal.close();
  }
}
