import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzTableModule } from 'ng-zorro-antd/table';
import { MicroItemDto } from 'src/app/common/microcontroller.model';
import { startWith, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { MicrocontrollerService } from 'src/app/api-services/microcontroller.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CreateLandMicrocontrollerComponent } from './create-land-microcontroller/create-land-microcontroller.component';
import { UpdateLandMicrocontrollerComponent } from './update-land-microcontroller/update-land-microcontroller.component';
import { CurrentGreenHouseService } from 'src/app/services/current-green-house.service';

@Component({
  selector: 'app-land-microcontroller',
  standalone: true,
  templateUrl: './land-microcontroller.component.html',
  styleUrls: ['./land-microcontroller.component.scss'],
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
export class LandMicrocontrollerComponent implements OnInit {
  data: MicroItemDto[] = [];
  dataTotal = 0;
  landId!:number;

  form:FormGroup = this.fb.nonNullable.group({
    Search: this.fb.nonNullable.control('',{validators:[Validators.required]}),
    Page: this.fb.nonNullable.control(1, {validators:[Validators.required]}),
    N: this.fb.nonNullable.control(10,{validators:[Validators.required]})
  });

  constructor(
    private fb: FormBuilder,
    private modalService: NzModalService,
    private microconService: MicrocontrollerService,
    private router: Router,
    private acRoute:ActivatedRoute,
    private curGh:CurrentGreenHouseService
  ) {
    // this.landId = this.acRoute.snapshot.data['landId'];
    // this.acRoute.params.subscribe(x=>this.landId = x['landId']);
  }

  ngOnInit(): void {
    // this.acRoute.params.subscribe(x=>this.landId =x['landId']);
    // this.acRoute.params.subscribe(x=>this.landId = x['landId']);
    this.curGh.chosedGreenHouse.subscribe(x=>this.landId=x);
    console.log(this.landId);
    this.form.valueChanges.pipe(
      startWith(
        this.form.value
        ),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(x=> {

        return this.microconService.search(x, this.landId);
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
  showModalCreate():void{
    this.modalService.create({
      nzContent:CreateLandMicrocontrollerComponent,
      nzComponentParams:{
        land_id:this.landId
      }
    }).afterClose.subscribe(id=>{
      this.form.updateValueAndValidity();
    });
  }
  showModalUpdate(id:number):void{
    const dt = this.data.filter(x=>x.Id === id )[0];
    console.log(dt ,id);
    this.modalService.create({
      nzContent:UpdateLandMicrocontrollerComponent,
      nzComponentParams:{
        data: dt,
        land_id:this.landId
      }
    }).afterClose.subscribe(id=>{
      this.form.updateValueAndValidity();
    });
  }
}
