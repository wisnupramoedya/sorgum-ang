import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzModalModule, NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationModule, NzNotificationService } from 'ng-zorro-antd/notification';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { MicroItemDto, UpdateMicroDto } from 'src/app/common/microcontroller.model';
import { NzMessageService } from 'ng-zorro-antd/message';
import { filter, switchMap, tap } from 'rxjs';
import { MicrocontrollerService } from 'src/app/api-services/microcontroller.service';
import {MiniPcService} from "../../../../../api-services/mini-pc.service";
import {MiniPcItem2DTO} from "../../../../../common/minipc.model";
import {DashboardModule} from "../../../dashboard.module";
import {Role} from "../../../../../common/account.model";

@Component({
  selector: 'app-update-land-microcontroller',
  standalone: true,
  templateUrl: './update-land-microcontroller.component.html',
  styleUrls: ['./update-land-microcontroller.component.scss'],
  imports: [
    CommonModule,
    DashboardModule,
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
export class UpdateLandMicrocontrollerComponent implements OnInit {
  @Input() land_id!:number;
  @Input() data!:MicroItemDto;

  roleEnum: typeof Role = Role;
  form: FormGroup = this.fb.nonNullable.group({
    Name: this.fb.nonNullable.control('', {
      validators: [Validators.required],
    }),
    Description: this.fb.nonNullable.control('', {
      validators: [Validators.required],
    }),
    MiniPcId: this.fb.nonNullable.control(0,{
      validators: [Validators.required],
    }),
  });
  isSubmitLoading = false;
  miniPcs: MiniPcItem2DTO[]=[];
  constructor(
    private modal: NzModalRef,
    private fb: UntypedFormBuilder,
    private msg: NzMessageService,
    private modalService:NzModalService,
    private miniPcService:MiniPcService,
    private microService:MicrocontrollerService,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.miniPcService.showMiniPcInALand(this.land_id)
    .subscribe(x=>this.miniPcs=x);
    const temp: UpdateMicroDto={
      Name:this.data.Name,
      Description:this.data.Description,
      MiniPcId:this.data.MiniPcId
    };
    this.form.patchValue(temp);
  }
  submitForm(): void {
    console.log(this.form.valid, this.form.value);

    if(this.form.valid){
      this.microService.update(this.data.Id,this.form.value)
      .pipe(
        tap(()=>this.notification.create(
          'success',
          'Sukses',
          'Pembaharuan microcontroller berhasil.'
        ))
      ).subscribe(()=>this.modal.close(0));

    }
  }
  destroyModal(): void {
    this.modal.close();
  }
  delete():void{
    console.log('menghapus microcontroller dengan id', this.data.Id);

    this.modalService.confirm({
      nzTitle: 'Anda yakin ingin menghapus microcontroller ini?',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        console.log('OK');
        return this.data.Id;
      },
      nzCancelText: 'No',
      nzOnCancel: () => {
        console.log('Cancel');
        return -1;
      }
    })
    .afterClose
    .pipe(
      filter(x=>x!==-1),
      switchMap(x=>{
          return this.microService.delete(x);
      }),
      tap(()=>this.notification.create(
        'success',
        'Sukses',
        'Hapus microcontroller berhasil.'
      ))
    )
    .subscribe(x=>{
      this.modal.close(this.data.Id);
    });
  }
}
