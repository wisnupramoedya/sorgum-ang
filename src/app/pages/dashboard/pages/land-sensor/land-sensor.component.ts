import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzTableModule, NzTableQueryParams } from 'ng-zorro-antd/table';
import { CreateLandSensorComponent } from './create-land-sensor/create-land-sensor.component';
import { UpdateLandSensorComponent } from './update-land-sensor/update-land-sensor.component';
import { SensorService } from 'src/app/api-services/sensor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { startWith, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { SensorItemDto } from 'src/app/common/sensor.model';
import { CurrentGreenHouseService } from 'src/app/services/current-green-house.service';

@Component({
  selector: 'app-land-sensor',
  standalone: true,
  templateUrl: './land-sensor.component.html',
  styleUrls: ['./land-sensor.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzTableModule,
    NzButtonModule,
    NzIconModule,
    NzPageHeaderModule
  ],
})
export class LandSensorComponent implements OnInit {
  data: SensorItemDto[] = [];
  landId!:number;
  form:FormGroup = this.fb.nonNullable.group({
    Search: this.fb.nonNullable.control('',{validators:[Validators.required]}),
    Page: this.fb.nonNullable.control(1, {validators:[Validators.required]}),
    N: this.fb.nonNullable.control(10,{validators:[Validators.required]})
  });
  dataTotal = 0;
  constructor(
    private fb: FormBuilder,
    private modalService: NzModalService,
    private sensorService: SensorService,
    private router: Router,
    private acRoute:ActivatedRoute,
    private curGh:CurrentGreenHouseService

  ) { 
    // this.landId = this.acRoute.snapshot.data['landId'];
    // this.acRoute.params.subscribe(x=>this.landId = x['landId']);
  }

  ngOnInit(): void {
    // this.acRoute.params.subscribe(x=>console.log(x));
    // this.acRoute.params.subscribe(x=>this.landId = x['landId']);
    this.curGh.chosedGreenHouse.subscribe(x=>this.landId=x);

    console.log(this.landId);
    this.form.valueChanges.pipe(
      startWith(
        this.form.value
        ),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(x=>this.sensorService.search(x))
    ).subscribe(
      (res: any)=>{
        console.log(res);
        this.data = res.Data;
        this.dataTotal=res.NTotal;
      }
    );
  }
  changePageIndex(event:number):void{
    this.form.controls['Page'].setValue(event);
  }
  changePageSize(event:number):void{
    this.form.controls['N'].setValue(event);
  }
  showModalCreate():void{
    this.modalService.create({
      nzContent:CreateLandSensorComponent,
      nzComponentParams:{
        land_id:this.landId
      }
    }).afterClose.subscribe(id=>{
      this.form.updateValueAndValidity();
    });
  }
  showModalUpdate(id:number):void{
    const dt = this.data.filter(x=>x.Id === id )[0];
    this.modalService.create({
      nzContent:UpdateLandSensorComponent,
      nzComponentParams:{
        data: dt,
        land_id:this.landId
      }
    }).afterClose.subscribe(id=>{
      this.form.updateValueAndValidity();
    });
  }
  onQueryParamsChange(params: NzTableQueryParams): void {
    console.log(params);
    const { pageSize, pageIndex, sort, filter } = params;
    this.changePageIndex(pageIndex);
  }
}
