import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { startWith, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { MicrocontrollerService } from 'src/app/api-services/microcontroller.service';
import { MicrocontrollerRowDto } from 'src/app/common/microcontroller.model';
import { CurrentGreenHouseService } from 'src/app/services/current-green-house.service';
import { CreatePlantComponent } from './create-plant/create-plant.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';


@Component({
  selector: 'app-plant-list',
  standalone: true,
  templateUrl: './plant-list.component.html',
  styleUrls: ['./plant-list.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzTableModule,
    NzPaginationModule,
    NzModalModule,
    NzButtonModule,
    NzIconModule
  ],
})
export class PlantListComponent implements OnInit {
  data: MicrocontrollerRowDto[] = [];

  form:FormGroup = this.fb.nonNullable.group({
    Search: this.fb.nonNullable.control('',{validators:[Validators.required]}),
    Page: this.fb.nonNullable.control(1, {validators:[Validators.required]}),
    N: this.fb.nonNullable.control(10,{validators:[Validators.required]})
  });
  dataTotal = 0;
  constructor(
    private fb: FormBuilder,
    private modalService: NzModalService,
    private microService: MicrocontrollerService,
    private currentGreenHouse: CurrentGreenHouseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form.valueChanges.pipe(
      startWith(
        this.form.value
        ),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(x=>this.microService.search(x))
    ).subscribe(
      (res: any)=>{
        console.log(res);
        this.data = res.data;
        this.dataTotal=res.nTotal;
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
      nzContent:CreatePlantComponent,
      nzWidth:'80%'
    }).afterClose.subscribe(id=>{
      console.log(id);
      if(!!id){
        // this.gotoDashboard(id);
      }
    })
  }

}
