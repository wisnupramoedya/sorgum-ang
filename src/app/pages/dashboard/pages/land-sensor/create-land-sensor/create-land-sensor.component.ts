import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzModalModule, NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationModule, NzNotificationService } from 'ng-zorro-antd/notification';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzMessageService } from 'ng-zorro-antd/message';
import { MicrocontrollerService } from 'src/app/api-services/microcontroller.service';
import { SensorService } from 'src/app/api-services/sensor.service';
import { MicroItemMinimalDto } from 'src/app/common/microcontroller.model';
import { tap } from 'rxjs';
import { SensorType } from 'src/app/common/sensor.model';

@Component({
  selector: 'app-create-land-sensor',
  standalone: true,
  templateUrl: './create-land-sensor.component.html',
  styleUrls: ['./create-land-sensor.component.scss'],
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
export class CreateLandSensorComponent implements OnInit {
  @Input() land_id!:number;
  isSubmitLoading = false;
  micros:MicroItemMinimalDto[]=[];
  sensorTypes:SensorType[]=[];
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
    Type: this.fb.nonNullable.control(0,{
      validators: [Validators.required],
    }),
  });
  constructor(
    private modal: NzModalRef,
    private fb: UntypedFormBuilder,
    private msg: NzMessageService,
    private sensorService:SensorService,
    private microService:MicrocontrollerService,
    private notification: NzNotificationService,
    private microcontrollerService:MicrocontrollerService
  ) { }

  ngOnInit(): void {
    this.microService.showMinimal(this.land_id)
    .subscribe(x=>this.micros=x);
    this.sensorService.getSensorTypes()
    .subscribe(x=>this.sensorTypes=x);
  }

  submitForm(): void {
    console.log(this.form.valid, this.form.value);
    
    if(this.form.valid){
      this.sensorService.add(this.form.value)
      .pipe(
        tap(()=>this.notification.create(
          'success',
          'Sukses',
          'Submit microcontroller baru berhasil.'
        ))
      ).subscribe(id=>this.modal.close(id));

    }
  }
  destroyModal(): void {
    this.modal.close();
  }

}
