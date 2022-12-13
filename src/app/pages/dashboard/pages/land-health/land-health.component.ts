import { Component, OnInit } from '@angular/core';
import {CommonModule} from "@angular/common";
import {IfRolesDirective} from "../../../../directives/if-roles.directive";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzPageHeaderModule} from "ng-zorro-antd/page-header";
import {Role} from "../../../../common/account.model";
import {DiseaseItemMinimalDto, DiseaseSearchResponse} from "../../../../common/disease.model";
import {NzModalService} from "ng-zorro-antd/modal";
import {ActivatedRoute, Router, RouterModule} from "@angular/router";
import {CurrentGreenHouseService} from "../../../../services/current-green-house.service";
import {DiseaseMonitorService} from "../../../../api-services/disease-monitor.service";
import {debounceTime, distinctUntilChanged, startWith, switchMap} from "rxjs/operators";

@Component({
  selector: 'app-land-health',
  templateUrl: './land-health.component.html',
  styleUrls: ['./land-health.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    IfRolesDirective,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzTableModule,
    NzButtonModule,
    NzIconModule,
    NzPageHeaderModule
  ],
})
export class LandHealthComponent implements OnInit {
  landId!: number;
  data: DiseaseItemMinimalDto[] = [];
  dataTotal = 0;

  roleEnum: typeof Role = Role;
  form: FormGroup = this.fb.nonNullable.group({
    Search: this.fb.nonNullable.control('',{validators:[Validators.required]}),
    Page: this.fb.nonNullable.control(1, {validators:[Validators.required]}),
    N: this.fb.nonNullable.control(10,{validators:[Validators.required]})
  })

  constructor(
    private fb: FormBuilder,
    private modalService: NzModalService,
    private router: Router,
    private acRoute: ActivatedRoute,
    private curGh: CurrentGreenHouseService,
    private diseaseMonitorService: DiseaseMonitorService
  ) { }

  ngOnInit(): void {
    this.curGh.chosedGreenHouse.subscribe(x => this.landId = x);

    this.form.valueChanges.pipe(
      startWith(
        this.form.value
      ),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(x => this.diseaseMonitorService.search(x))
    ).subscribe(
      (res: DiseaseSearchResponse) => {
        this.data = res.Data;
        this.dataTotal = res.NTotal;
      }
    )
  }

  changePageIndex(event:number): void {
    this.form.controls['Page'].setValue(event);
  }

  changePageSize(event:number): void {
    this.form.controls['N'].setValue(event);
  }

}
