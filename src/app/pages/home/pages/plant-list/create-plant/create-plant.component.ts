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
import { PlantService } from 'src/app/api-services/plant.service';
import { NzNotificationModule, NzNotificationService } from 'ng-zorro-antd/notification';
import { tap } from 'rxjs';
import {NzSelectModule} from "ng-zorro-antd/select";
import {ParamSelectItem} from "../../../../../common/PlantParameter.model";
import {PlantParameterService} from "../../../../../api-services/plant-parameter.service";
@Component({
  selector: 'app-create-plant',
  standalone: true,
  templateUrl: './create-plant.component.html',
  styleUrls: ['./create-plant.component.scss'],
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
    NzNotificationModule
  ],
})
export class CreatePlantComponent implements OnInit {
  parameterItems: ParamSelectItem[] = [];
  form:FormGroup = this.fb.nonNullable.group({
    // Id: this.fb.nonNullable.control(0),
    Name: this.fb.nonNullable.control('', {validators:[Validators.required]}),
    LatinName: this.fb.nonNullable.control('', {validators:[Validators.required]}),
    Description: this.fb.nonNullable.control(''),
    Parameters: this.fb.nonNullable.array([])
  });
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
    private plantService: PlantService,
    private notification: NzNotificationService,
    private plantParameterService: PlantParameterService,
  ) { }
  ngOnInit(): void {
    this.plantParameterService.showAllParam()
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
      this.plantService.add(this.form.value)
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
}
