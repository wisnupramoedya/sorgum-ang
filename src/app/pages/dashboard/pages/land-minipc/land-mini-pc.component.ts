import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzPageHeaderModule} from "ng-zorro-antd/page-header";
import {MiniPcItemDto} from "../../../../common/minipc.model";
import {ActivatedRoute, Router} from "@angular/router";
import {CurrentGreenHouseService} from "../../../../services/current-green-house.service";
import {NzModalService} from "ng-zorro-antd/modal";
import {debounceTime, distinctUntilChanged, startWith, switchMap} from "rxjs";
import {CreateLandMiniPcComponent} from "./create-land-mini-pc/create-land-mini-pc.component";
import {UpdateLandMiniPcComponent} from "./update-land-mini-pc/update-land-mini-pc.component";
import {MiniPcService} from "../../../../api-services/mini-pc.service";

@Component({
  selector: 'app-land-minipc',
  standalone: true,
  templateUrl: './land-mini-pc.component.html',
  styleUrls: ['./land-mini-pc.component.scss'],
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
export class LandMiniPcComponent implements OnInit {
  landId!: number;
  data: MiniPcItemDto[] = [];
  dataTotal = 0;
  form: FormGroup = this.fb.nonNullable.group({
    Search: this.fb.nonNullable.control('',{validators:[Validators.required]}),
    Page: this.fb.nonNullable.control(1, {validators:[Validators.required]}),
    N: this.fb.nonNullable.control(10,{validators:[Validators.required]})
  })

  constructor(
    private fb: FormBuilder,
    private modalService: NzModalService,
    private miniPcService: MiniPcService,
    private router: Router,
    private acRoute: ActivatedRoute,
    private curGh: CurrentGreenHouseService
  ) { }

  ngOnInit(): void {
    this.curGh.chosedGreenHouse.subscribe(x=>this.landId=x);

    this.form.valueChanges.pipe(
      startWith(
        this.form.value
      ),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(x => this.miniPcService.search(x))
    ).subscribe(
      (res: any) => {
        console.log(res);
        this.data = res.Data;
        this.dataTotal = res.NTotal;
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
      nzContent: CreateLandMiniPcComponent,
      nzComponentParams: {
        land_id: this.landId
      }
    }).afterClose.subscribe(()=>{
      this.form.updateValueAndValidity();
    });
  }

  showModalUpdate(id:number):void{
    const dt = this.data.filter(x=>x.Id === id )[0];
    this.modalService.create({
      nzContent: UpdateLandMiniPcComponent,
      nzComponentParams: {
        data: dt,
        land_id:this.landId
      }
    }).afterClose.subscribe(()=>{
      this.form.updateValueAndValidity();
    });
  }

}
