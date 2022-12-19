import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormArray, FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  Validators
} from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule, NzModalRef } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { GreenHouseService } from 'src/app/api-services/green-house.service';
import { HttpClient } from '@angular/common/http';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzListModule } from 'ng-zorro-antd/list';
import { TitleStrategy } from '@angular/router';
import { PlanService } from 'src/app/api-services/plan.service';
import { NzNotificationModule, NzNotificationService } from 'ng-zorro-antd/notification';
import { tap } from 'rxjs';
import {NzSelectModule} from "ng-zorro-antd/select";
import {ParamSelectItem} from "../../../../../common/planparameter.model";
import {PlanParameterService} from "../../../../../api-services/plan-parameter.service";
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { getISOWeek } from 'date-fns';
import { en_US, NzI18nService, zh_CN } from 'ng-zorro-antd/i18n';

@Component({
  selector: 'app-create-land-plan',
  standalone: true,
  templateUrl: './create-land-plan.component.html',
  styleUrls: ['./create-land-plan.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzModalModule,
    NzGridModule,
    NzIconModule,
    NzSelectModule,
    NzListModule,
    NzRadioModule,
    NzNotificationModule,
    NzCheckboxModule,
    NzDatePickerModule
  ],
})
export class CreatePlanComponent implements OnInit {
  parameterItems: ParamSelectItem[] = [];
  radioValue = 'A';
  form:FormGroup = this.fb.nonNullable.group({
    // Id: this.fb.nonNullable.control(0),
    Name: this.fb.nonNullable.control('', {validators:[Validators.required]}),
    LatinName: this.fb.nonNullable.control('', {validators:[Validators.required]}),
    Description: this.fb.nonNullable.control(''),
    Parameters: this.fb.nonNullable.array([])
  });
  date = null;
  isEnglish = false;

  onChange(result: Date): void {
    console.log('onChange: ', result);
  }

  getWeek(result: Date): void {
    console.log('week: ', getISOWeek(result));
  }

  changeLanguage(): void {
    this.i18n.setLocale(this.isEnglish ? zh_CN : en_US);
    this.isEnglish = !this.isEnglish;
  }
  get Paramete(): FormArray {
    return this.form.controls["Parameters"] as FormArray;
  }
  DescParamete(idx:number): FormArray {
    return (this.Paramete.controls[idx] as FormControl).get('Descriptions') as FormArray;
  }
  isSubmitLoading=false;
  constructor(
    private modal: NzModalRef,
    private fb:FormBuilder,
    private msg: NzMessageService,
    private http: HttpClient,
    private PlanService: PlanService,
    private notification: NzNotificationService,
    private i18n: NzI18nService,
    private PlanParameterService: PlanParameterService,
  ) { }
  ngOnInit(): void {
    this.PlanParameterService.showAllParam()
      .subscribe(x=>this.parameterItems=x)
  }
  newParameter():FormGroup{
    return this.fb.nonNullable.group({
      // Id: this.fb.nonNullable.control(0),
      ParentTypeId: this.fb.nonNullable.control(0,{validators:[Validators.required]}),
      Descriptions:this.fb.nonNullable.array([
        this.newDescriptionParameter()
      ], {validators:[Validators.required]})
    });
  }
  newDescriptionParameter():FormGroup{
    return this.fb.nonNullable.group({
      // Id: this.fb.nonNullable.control(0),
      Description: this.fb.nonNullable.control('',{validators:[Validators.required]}),
      MinValue: this.fb.nonNullable.control('',{validators:[Validators.required]}),
      MaxValue: this.fb.nonNullable.control('',{validators:[Validators.required]}),
      Color: this.fb.nonNullable.control('#000000',{validators:[Validators.required]}),
    });
  }
  addParameter():void{
    this.Paramete.push(this.newParameter());
    this.form.updateValueAndValidity();
  }
  removeParameter(idx:number):void{
    this.Paramete.removeAt(idx);
  }
  addDescriptionParameter(idx_parameter:number):void{
    (this.Paramete.at(idx_parameter).get('Descriptions') as FormArray).push(this.newDescriptionParameter());
  }
  removeDescriptionParameter(idx_parameter:number, idx_desc_parameter:number):void{
    (this.Paramete.at(idx_parameter).get('Descriptions') as FormArray).removeAt(idx_desc_parameter);
  }

  submitForm():void{
    console.log(this.form.errors, this.form.value);
    if(this.form.valid){
      this.PlanService.add(this.form.value)
          .pipe(
            tap(()=>this.notification.create(
              'success',
              'Sukses',
              'Submit tanaman baru berhasil.'
            ))
          ).subscribe(id=>this.modal.close(id));
    }
  }
  destroyModal():void{
    this.modal.close();
  }
  checkOptionsOne = [
    { label: 'Senin', value: 'senin', checked: true },
    { label: 'Selasa', value: 'selasa' },
    { label: 'Rabu', value: 'rabu' },
    { label: 'Kamis', value: 'kamis' },
    { label: 'Jumat', value: 'jumat' },
    { label: 'Sabtu', value: 'sabtu' },
    { label: 'Minggu', value: 'minggu' }
  ];
}
