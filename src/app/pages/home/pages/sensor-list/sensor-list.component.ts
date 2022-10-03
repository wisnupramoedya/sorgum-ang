import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router, RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzTableModule, NzTableQueryParams } from 'ng-zorro-antd/table';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { CardNComponent } from 'src/app/components/card-n/card-n.component';
import { SensorItemDto, SensorType } from 'src/app/common/sensor.model';
import { SensorService } from 'src/app/api-services/sensor.service';
import { startWith, debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs';
import { CurrentGreenHouseService } from 'src/app/services/current-green-house.service';

export class SensorItemDtoModified extends SensorItemDto{
  TypeSensorName!:string;
}

@Component({
  selector: 'app-sensor-list',
  standalone: true,
  templateUrl: './sensor-list.component.html',
  styleUrls: ['./sensor-list.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    NzFormModule,
    RouterModule,
    NzCardModule,
    NzButtonModule,
    NzPaginationModule,
    NzInputModule,
    NzListModule,
    NzGridModule,
    NzUploadModule,
    NzIconModule,
    NzModalModule,
    CardNComponent,
    NzTableModule
  ],
})
export class SensorListComponent implements OnInit {
  data: SensorItemDtoModified[] = [];
  sensorTypesData:SensorType[]=[];
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
    private currentGreenHouse: CurrentGreenHouseService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.sensorTypesData = this.route.snapshot.data['sensorTypesData'];
    console.log(this.sensorTypesData);

    this.form.valueChanges.pipe(
      startWith(
        this.form.value
        ),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(x=>this.sensorService.search(x)),
      map(x=>{
        x.Data = x.Data.map(y=>{
          const temp:SensorItemDtoModified={
            ...y,
            TypeSensorName:this.sensorTypesData.find(z=>z.Id==y.TypeId)?.Name!
          }
          return temp;
        })
        return x;
      })
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
  onQueryParamsChange(params: NzTableQueryParams): void {
    console.log(params);
    const { pageSize, pageIndex, sort, filter } = params;
    this.changePageIndex(pageIndex);
  }
}
