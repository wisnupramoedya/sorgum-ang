import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { ActorCardComponent } from './components/actor-card/actor-card.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import {MicroItemDto} from "../../../../common/microcontroller.model";
import {ActuatorItemDto} from "../../../../common/actuator.model";
import {CurrentGreenHouseService} from "../../../../services/current-green-house.service";
import {debounceTime, distinctUntilChanged, startWith, switchMap} from "rxjs";
import {ActuatorService} from "../../../../api-services/actuator.service";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";

@Component({
  selector: 'app-land-actuator',
  standalone: true,
  templateUrl: './land-actuator.component.html',
  styleUrls: ['./land-actuator.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NzPageHeaderModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzCheckboxModule,
    NzDropDownModule,
    ActorCardComponent,
    NzIconModule
  ],
})
export class LandActuatorComponent implements OnInit {
  data: ActuatorItemDto[] = [];
  dataTotal = 0;
  landId!:number;

  form: FormGroup = this.fb.nonNullable.group({
    Search: this.fb.nonNullable.control('',{validators:[Validators.required]}),
    Page: this.fb.nonNullable.control(1, {validators:[Validators.required]}),
    N: this.fb.nonNullable.control(10,{validators:[Validators.required]})
  });

  constructor(
    private fb: FormBuilder,
    private currentGreenHouseService: CurrentGreenHouseService,
    private actuatorService: ActuatorService
  ) { }

  ngOnInit(): void {
    this.currentGreenHouseService.chosedGreenHouse.subscribe(x => this.landId = x);
    this.form.valueChanges.pipe(
      startWith(
        this.form.value
      ),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(x=> {
        return this.actuatorService.search(x, this.landId);
      })
    ).subscribe(
      (res: any)=>{
        console.log(res);
        this.data = res.Data;
        this.dataTotal=res.NTotal;
      }
    );
  }
  //
  // allChecked = false;
  // indeterminate = true;
  // checkOptionsActuator = [
  //
  // ];
  // checkOptionsOne = [
  //   { label: 'Apple', value: 'Apple', checked: true },
  //   { label: 'Pear', value: 'Pear', checked: false },
  //   { label: 'Orange', value: 'Orange', checked: false }
  // ];
  //
  // updateAllChecked(): void {
  //   this.indeterminate = false;
  //   if (this.allChecked) {
  //     this.checkOptionsOne = this.checkOptionsOne.map(item => ({
  //       ...item,
  //       checked: true
  //     }));
  //   } else {
  //     this.checkOptionsOne = this.checkOptionsOne.map(item => ({
  //       ...item,
  //       checked: false
  //     }));
  //   }
  // }

  // updateSingleChecked(): void {
  //   if (this.checkOptionsOne.every(item => !item.checked)) {
  //     this.allChecked = false;
  //     this.indeterminate = false;
  //   } else if (this.checkOptionsOne.every(item => item.checked)) {
  //     this.allChecked = true;
  //     this.indeterminate = false;
  //   } else {
  //     this.indeterminate = true;
  //   }
  // }
}
