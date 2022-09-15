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
    Name: this.fb.nonNullable.control('', {validators:[Validators.required]}),
    Code: this.fb.nonNullable.control('', {validators:[Validators.required]}),
    Description: this.fb.nonNullable.control(''),
    Parameters: this.fb.nonNullable.array([])
  });
  get Parameters(): FormArray {
    return this.form.controls["skills"] as FormArray;
  }
  isSubmitLoading=false;
  constructor(
    private modal: NzModalRef,
    private fb:UntypedFormBuilder,
    private msg: NzMessageService,
    private http: HttpClient,
    private greenhouseService: GreenHouseService
  ) { }
  
  newParameter():FormGroup{
    return this.fb.nonNullable.group({
      GroupName: this.fb.nonNullable.control('',{validators:[Validators.required]}),
      Descriptions:this.fb.nonNullable.array([
        // this.newDescriptionParameter()
      ])
    });
  }
  newDescriptionParameter():FormGroup{
    return this.fb.nonNullable.group({
      Description: this.fb.nonNullable.control('',{validators:[Validators.required]}),
      MinValue: this.fb.nonNullable.control('',{validators:[Validators.required]}),
      MaxValue: this.fb.nonNullable.control('',{validators:[Validators.required]}),
    });
  }
  addParameter():void{
    this.Parameters.push(this.newParameter())
  }
  removeParameter(idx:number):void{
    this.Parameters.removeAt(idx);
  }
  addDescriptionParameter(idx_parameter:number):void{
    (this.Parameters.at(idx_parameter).get('Descriptions') as FormArray).push(this.newDescriptionParameter());
  }
  removeDescriptionParameter(idx_parameter:number, idx_desc_parameter:number):void{
    (this.Parameters.at(idx_parameter).get('Descriptions') as FormArray).removeAt(idx_desc_parameter);
  }
  ngOnInit(): void {
  }

  submitForm():void{

  }
  destroyModal():void{

  }
}
