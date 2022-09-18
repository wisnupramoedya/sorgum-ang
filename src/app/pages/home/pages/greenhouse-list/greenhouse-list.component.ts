import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { GreenHouseService } from 'src/app/api-services/green-house.service';
import { GreenHouseDto, GreenHouseSearchResponse } from 'src/app/common/greenhouse.model';
import { CurrentGreenHouseService } from 'src/app/services/current-green-house.service';
import { ModalAddGreenhouseComponent } from '../../components/modal-add-greenhouse/modal-add-greenhouse.component';
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  switchMap,
  tap
} from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzUploadModule } from 'ng-zorro-antd/upload';

@Component({
  templateUrl: './greenhouse-list.component.html',
  styleUrls: ['./greenhouse-list.component.scss'],
  standalone:true,
  imports:[
    CommonModule,
    ReactiveFormsModule,
    NzListModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    NzCardModule,
    NzModalModule,
    NzPaginationModule,
    NzIconModule,
    NzUploadModule,
    NzMessageModule,
    NzGridModule,
    NzBreadCrumbModule
  ]
})
export class GreenhouseListComponent implements OnInit {
  data: GreenHouseDto[] = [];
  form!: UntypedFormGroup;
  dataTotal = 0;
  constructor(
    private fb:UntypedFormBuilder,
    private modalService: NzModalService,
    private greenhouseService: GreenHouseService,
    private currentGreenHouse: CurrentGreenHouseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.form.valueChanges.pipe(
      startWith(
        this.form.value
        ),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(x=>this.greenhouseService.search(x))
    ).subscribe(
      (res: GreenHouseSearchResponse)=>{
        console.log(res);
        this.data = res.Data;
        this.dataTotal=res.NTotal;
      }
    )
  }
  initForm():void{
    this.form = this.fb.group({
      Search:[''],
      Page:[1],
      N:[10]
    })
  }
  changePageIndex(event:number):void{
    this.form.controls['Page'].setValue(event);
  }
  changePageSize(event:number):void{
    this.form.controls['N'].setValue(event);
  }
  submitFormSearch():void{

  }
  gotoDashboard(id:number):void{
    this.currentGreenHouse.chosedGreenHouse.next(id);
    this.router.navigate(["dashboard",id]);
  }
  showModalAddGreenHouse():void{
    this.modalService.create({
      nzContent:ModalAddGreenhouseComponent,
    }).afterClose.subscribe(id=>{
      console.log(id);
      if(!!id){
        this.gotoDashboard(id);
      }
    })
  }
}
