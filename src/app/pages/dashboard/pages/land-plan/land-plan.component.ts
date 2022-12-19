import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTableModule, NzTableQueryParams } from 'ng-zorro-antd/table';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { startWith, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { CreatePlanComponent } from './create-plan/create-land-plan.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { UpdatePlanComponent } from './update-plan/update-land-plan.component';
import { ReadPlanDto } from 'src/app/common/plan.model';
import { PlanService } from 'src/app/api-services/plan.service';
import {Role} from "../../../../common/account.model";
import {IfRolesDirective} from "../../../../directives/if-roles.directive";
import {NzCalendarModule} from 'ng-zorro-antd/calendar';
import {NzBadgeModule} from 'ng-zorro-antd/badge';
import { NzNotificationModule } from 'ng-zorro-antd/notification';


@Component({
  selector: 'app-plan',
  standalone: true,
  templateUrl: './land-plan.component.html',
  styleUrls: ['./land-plan.component.scss'],
  imports: [
    CommonModule,
    IfRolesDirective,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzTableModule,
    NzPaginationModule,
    NzModalModule,
    NzButtonModule,
    NzCalendarModule,
    NzIconModule,
    NzNotificationModule,
    NzBadgeModule,
    RouterModule
  ],
})
export class PlanComponent implements OnInit {
  data: ReadPlanDto[] = [];
  roleEnum: typeof Role = Role;

  form:FormGroup = this.fb.nonNullable.group({
    Search: this.fb.nonNullable.control('',{validators:[Validators.required]}),
    Page: this.fb.nonNullable.control(1, {validators:[Validators.required]}),
    N: this.fb.nonNullable.control(10,{validators:[Validators.required]})
  });
  dataTotal = 0;
  constructor(
    private fb: FormBuilder,
    private modalService: NzModalService,
    private PlanService: PlanService,
    private router: Router
  ) { }

  listDataMap = {
    eight: [
      { type: 'warning', content: 'This is warning event.' },
      { type: 'success', content: 'This is usual event.' }
    ],
    ten: [
      { type: 'warning', content: 'This is warning event.' },
      { type: 'success', content: 'This is usual event.' },
      { type: 'error', content: 'This is error event.' }
    ],
    eleven: [
      { type: 'warning', content: 'This is warning event' },
      { type: 'success', content: 'This is very long usual event........' },
      { type: 'error', content: 'This is error event 1.' },
      { type: 'error', content: 'This is error event 2.' },
      { type: 'error', content: 'This is error event 3.' },
      { type: 'error', content: 'This is error event 4.' }
    ] }

    getMonthData(date: Date): number | null {
      if (date.getMonth() === 8) {
        return 1394;
      }
      return null;
    }
  

  ngOnInit(): void {
    this.form.valueChanges.pipe(
      startWith(
        this.form.value
        ),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(x=>this.PlanService.search(x))
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
      nzContent:CreatePlanComponent,
      nzWidth:'50%'
    }).afterClose.subscribe(id=>{
      console.log(id);
      if(!!id){
        this.loadData();
      }
    })
  }
  loadData():void{
    this.PlanService.search(this.form.value).subscribe((res: any)=>{
      console.log(res);
      this.data = res.Data;
      this.dataTotal=res.NTotal;
    });
  }

  showModalUpdate(id:number):void{
    const dt = this.data.filter(x=>x.Id === id )[0];
    this.modalService.create({
      nzContent:UpdatePlanComponent,
      nzWidth:'80%',
      nzComponentParams:{
        data: dt
      }
    }).afterClose.subscribe(id=>{
      console.log(id);
      if(!!id){
        this.loadData();
      }
    })
  }
  onQueryParamsChange(params: NzTableQueryParams): void {
    console.log(params);
    const { pageSize, pageIndex, sort, filter } = params;
    this.changePageIndex(pageIndex);
  }
}
