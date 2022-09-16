import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
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
@Component({
  selector: 'app-create-plant',
  standalone: true,
  templateUrl: './create-plant.component.html',
  styleUrls: ['./create-plant.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzModalModule,
    NzGridModule,
    NzIconModule,
    NzListModule
  ],
})
export class CreatePlantComponent implements OnInit {
  form:FormGroup = this.fb.nonNullable.group({
    Id: this.fb.nonNullable.control(0),
    Name: this.fb.nonNullable.control('', {validators:[Validators.required]}),
    Code: this.fb.nonNullable.control('', {validators:[Validators.required]}),
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
    private fb:UntypedFormBuilder,
    private msg: NzMessageService,
    private http: HttpClient,
    private greenhouseService: GreenHouseService
  ) { }
  ngOnInit(): void {
  }
  newParameter():FormGroup{
    return this.fb.nonNullable.group({
      Id: this.fb.nonNullable.control(0),
      GroupName: this.fb.nonNullable.control('',{validators:[Validators.required]}),
      Descriptions:this.fb.nonNullable.array([
        this.newDescriptionParameter()
      ], {validators:[Validators.required]})
    });
  }
  newDescriptionParameter():FormGroup{
    return this.fb.nonNullable.group({
      Id: this.fb.nonNullable.control(0),
      Description: this.fb.nonNullable.control('',{validators:[Validators.required]}),
      MinValue: this.fb.nonNullable.control('',{validators:[Validators.required]}),
      MaxValue: this.fb.nonNullable.control('',{validators:[Validators.required]}),
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
    console.log(this.form.valid);
    console.log(this.form.errors);
    console.log(this.form.value);
  }
  destroyModal():void{
    this.modal.close();
  }
}
