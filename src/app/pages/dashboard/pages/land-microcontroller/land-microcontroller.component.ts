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
    private microconService: MicrocontrollerService,
    private router: Router,
    private acRoute:ActivatedRoute

  ) { }

  ngOnInit(): void {
    this.landId = this.acRoute.snapshot.params['landId'];
    console.log(this.landId);
    this.form.valueChanges.pipe(
      startWith(
        this.form.value
        ),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(x=>this.microconService.search(x))
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
    this.modalService.create({
      nzContent:UpdateLandMicrocontrollerComponent,
      nzComponentParams:{
        data: dt
      }
    }).afterClose.subscribe(id=>{
      this.form.updateValueAndValidity();
    });
  }
}
