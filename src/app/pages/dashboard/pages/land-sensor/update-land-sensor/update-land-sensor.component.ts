import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormGroup, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzModalModule, NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationModule, NzNotificationService } from 'ng-zorro-antd/notification';
import { MicroItemMinimalDto } from 'src/app/common/microcontroller.model';
import { SensorItemDto, SensorType, UpdateSensorDto } from 'src/app/common/sensor.model';
import { NzMessageService } from 'ng-zorro-antd/message';
import { MicrocontrollerService } from 'src/app/api-services/microcontroller.service';
import { SensorService } from 'src/app/api-services/sensor.service';
import { tap, filter, switchMap } from 'rxjs';
import {Role} from "../../../../../common/account.model";
import {IfRolesDirective} from "../../../../../directives/if-roles.directive";

@Component({
  selector: 'app-update-land-sensor',
  standalone: true,
  templateUrl: './update-land-sensor.component.html',
  styleUrls: ['./update-land-sensor.component.scss'],
  imports: [
    CommonModule,
    IfRolesDirective,
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
export class UpdateLandSensorComponent implements OnInit {
  @Input() land_id!:number;
  @Input() data!:SensorItemDto;
  isSubmitLoading = false;
  micros:MicroItemMinimalDto[]=[];
  sensorTypes:SensorType[]=[];
  roleEnum: typeof Role = Role;
  form: FormGroup = this.fb.nonNullable.group({
    Name: this.fb.nonNullable.control('', {
      validators: [Validators.required],
    }),
    Description: this.fb.nonNullable.control('', {
      validators: [Validators.required],
    }),
    MicroId: this.fb.nonNullable.control(0,{
      validators: [Validators.required],
    }),
    TypeId: this.fb.nonNullable.control(0,{
      validators: [Validators.required],
    }),
  });
  constructor(
    private modal: NzModalRef,
    private fb: UntypedFormBuilder,
    private msg: NzMessageService,
    private modalService:NzModalService,
    private sensorService:SensorService,
    private microService:MicrocontrollerService,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.microService.showMinimal(this.land_id)
    .subscribe(x=>this.micros=x);
    this.sensorService.getSensorTypes()
    .subscribe(x=>this.sensorTypes=x);

    this.microService.showMinimal(this.land_id)
    .pipe(
      tap(x=>this.micros=x),
      switchMap(()=>this.sensorService.getSensorTypes()),
      tap(x=>this.sensorTypes=x)
    )
    .subscribe(x=>{
      console.log(this.data);
      const temp:UpdateSensorDto={
        Description:this.data.Description,
        MicroId:this.data.MicroId,
        Name:this.data.Name,
        TypeId:this.data.TypeId
      };
      this.form.patchValue(temp);

    });

  }
  submitForm(): void {
    console.log(this.form.valid, this.form.value);

    if(this.form.valid){
      this.sensorService.update(this.data.Id,this.form.value)
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
