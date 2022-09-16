import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzModalModule, NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { HttpClient } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd/message';
import {
  CreatePlantDto,
  DescriptionReadParameterPlantDto,
  ReadPlantDto,
} from 'src/app/common/plant.model';
import { CreateDescriptionParameter, CreateParameter, DescriptionCreateParameter, UpdateDescriptionParameter, UpdateParameter } from 'src/app/common/PlantParameter.model';

@Component({
  selector: 'app-update-plant',
  standalone: true,
  templateUrl: './update-plant.component.html',
  styleUrls: ['./update-plant.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzModalModule,
    NzGridModule,
    NzIconModule,
    NzListModule,
  ],
})
export class UpdatePlantComponent implements OnInit {
  @Input() data!: ReadPlantDto;
  form: FormGroup = this.fb.nonNullable.group({
    Id: this.fb.nonNullable.control(0, {
      validators: [Validators.required],
    }),
    Name: this.fb.nonNullable.control('', {
      validators: [Validators.required],
    }),
    Code: this.fb.nonNullable.control('', {
      validators: [Validators.required],
    }),
    Description: this.fb.nonNullable.control(''),
  });
  formParameter: FormGroup = this.fb.nonNullable.group({
    Parameters: this.fb.nonNullable.array([]),
  })
  get Paramete(): FormArray {
    return this.formParameter.controls['Parameters'] as FormArray;
  }
  DescParamete(idx: number): FormArray {
    return (this.Paramete.controls[idx] as FormControl).get(
      'Descriptions'
    ) as FormArray;
  }
  isSubmitLoading = false;
  constructor(
    private modal: NzModalRef,
    private modalService: NzModalService,
    private fb: UntypedFormBuilder,
    private msg: NzMessageService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.insertDataToForm();
  }

  insertDataToForm(): void {
    this.form.patchValue(this.data);
    this.form.updateValueAndValidity();
    this.formParameter.controls['Parameters'] = this.insertDataParameterToForm();
    this.formParameter.updateValueAndValidity();
  }
  insertDataParameterToForm(): FormArray {
    const temp: FormArray = this.fb.nonNullable.array([]);
    for (let index = 0; index < this.data.Parameters.length; index++) {
      const element = this.data.Parameters[index];
      const tempF: FormGroup = this.fb.nonNullable.group({
        GroupName: this.fb.nonNullable.control(element.GroupName, {
          validators: [Validators.required],
        }),
        Descriptions: this.insertDataDescriptionParameterToForm(element.Descriptions)
      });
      temp.push(tempF);
    }
    return temp;
  }
  insertDataDescriptionParameterToForm(
    data: DescriptionReadParameterPlantDto[]
  ): FormArray {
    const temp: FormArray = this.fb.nonNullable.array([]);
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      const tempF: FormGroup = this.fb.nonNullable.group({
        Id: this.fb.nonNullable.control(element.Id, {
          validators: [Validators.required],
        }),
        Description: this.fb.nonNullable.control(element.Description, {
          validators: [Validators.required],
        }),
        MinValue: this.fb.nonNullable.control(element.MinValue, {
          validators: [Validators.required],
        }),
        MaxValue: this.fb.nonNullable.control(element.MaxValue, {
          validators: [Validators.required],
        }),
      });
      temp.push(tempF);
    }
    return temp;
  }


  updatePlant():void{
    // const formCp: FormGroup = this.form;
    // formCp.removeControl('Parameters');
    // console.log(formCp.value);
    
  }
  newParameter(): FormGroup {
    return this.fb.nonNullable.group({
      GroupName: this.fb.nonNullable.control('', {
        validators: [Validators.required],
      }),
      Descriptions: this.fb.nonNullable.array(
        [this.newDescriptionParameter()],
        { validators: [Validators.required] }
      ),
    });
  }
  newDescriptionParameter(): FormGroup {
    return this.fb.nonNullable.group({
      Id: this.fb.nonNullable.control(0),
      Description: this.fb.nonNullable.control('', {
        validators: [Validators.required],
      }),
      MinValue: this.fb.nonNullable.control('', {
        validators: [Validators.required],
      }),
      MaxValue: this.fb.nonNullable.control('', {
        validators: [Validators.required],
      }),
    });
  }
  addParameter(): void {
    this.Paramete.push(this.newParameter());
    this.formParameter.updateValueAndValidity();
  }
  removeParameter(idx: number): void {
    this.Paramete.removeAt(idx);
  }
  addDescriptionParameter(idx_parameter: number): void {
    (this.Paramete.at(idx_parameter).get('Descriptions') as FormArray).push(
      this.newDescriptionParameter()
    );
  }
  removeDescriptionParameter(
    idx_parameter: number,
    idx_desc_parameter: number
  ): void {
    (this.Paramete.at(idx_parameter).get('Descriptions') as FormArray).removeAt(
      idx_desc_parameter
    );
  }


  destroyModal(): void {
    this.modal.close();
  }

  saveParameter(idx_parameter:number):void{
    const param = this.Paramete.at(idx_parameter);
    const newDesc = this.Paramete.controls[idx_parameter].get('Descriptions')
    const isAllNew = this.isAllNewDescriptionParameter(newDesc);

    if(isAllNew){
      const descs:DescriptionCreateParameter[]=[];
      const tempArr = newDesc as FormArray;
      for (let index = 0; index < tempArr.length; index++) {
        const element = tempArr.at(index);
        const temp:DescriptionCreateParameter={
          Description:element.get('Description')?.value,
          MaxValue:element.get('MaxValue')?.value,
          MinValue:element.get('MinValue')?.value,
        };
        descs.push(temp);
      }
      // jika allnew 
      const obj:CreateParameter={
        PlantId: this.data.Id,
        GroupName:param.get('GroupName')?.value,
        Descriptions:descs
      }


    }else{
      // jika update hanya groupname
      const obj:UpdateParameter={
        GroupName:param.get('GroupName')?.value,
        PlantId: this.data.Id,
      }
    }
  }

  isAllNewDescriptionParameter(abs: AbstractControl|null){
    const arr = abs as FormArray;
    let temp=0;
    for (let index = 0; index < arr.length; index++) {
      const element = arr.at(index).value;
      if(element.Id === 0){
        temp+=1;
      }
    }
    return temp === arr.length;
  }

  saveDescriptionParameter(idx_parameter:number,idx_desc_parameter: number):void{
    const param = this.Paramete.at(idx_parameter);
    const descParam = (this.Paramete.at(idx_parameter).get('Descriptions') as FormArray).at(idx_desc_parameter);
    console.log(descParam.get('Id')?.value);
    console.log(this.DescParamete(idx_parameter).controls[idx_desc_parameter].invalid);
    
    if(descParam.get('Id')?.value !== 0){
      // update
      console.log("update DescriptionParameter");
      const obj: UpdateDescriptionParameter={
        Description: descParam.get('Description')?.value,
        MaxValue: descParam.get('MaxValue')?.value,
        MinValue: descParam.get('MinValue')?.value,
      }
    }
    else{
      // create new
      console.log("create new DescriptionParameter");
      const obj: CreateDescriptionParameter={
        PlantId: this.data.Id,
        GroupName:param.get('GroupName')?.value,
        Description: descParam.get('Description')?.value,
        MaxValue: descParam.get('MaxValue')?.value,
        MinValue: descParam.get('MinValue')?.value,
      }
    }
  }

  deleteParameter(i:number):void{
    const d = (this.Paramete.at(i) as FormGroup);
    this.modalService.confirm({
      nzTitle: 'Anda yakin ingin menghapus parameter ini?',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        console.log('OK');
        return {
          GroupName: d.controls['GroupName'].value,
          PlantId: this.data.Id
        };
      },
      nzCancelText: 'No',
      nzOnCancel: () => {
        console.log('Cancel');
        return -1;
      }
    }).afterClose.subscribe(x=>{
      console.log("id hapus",x)
      if(x!==-1){
        this.removeParameter(i);
      }
    });
  }
  deleteDescParameter(i:number, j:number):void{
    const d = (this.DescParamete(i).controls[j] as FormGroup);
    this.modalService.confirm({
      nzTitle: 'Anda yakin ingin menghapus deskripsi parameter ini?',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        console.log('OK');
        return d.controls['Id'].value;
      },
      nzCancelText: 'No',
      nzOnCancel: () => {
        console.log('Cancel');
        return -1;
      }
    }).afterClose.subscribe(x=>{
      console.log("id hapus",x)
      if(x!==-1){
        this.removeDescriptionParameter(i,j);
      }
    });
  }

  deletePlant():void{
    this.modalService.confirm({
      nzTitle: 'Anda yakin ingin menghapus tanaman ini?',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        console.log('OK');
        return this.data.Id;
      },
      nzCancelText: 'No',
      nzOnCancel: () => {
        console.log('Cancel');
        return -1;
      }
    }).afterClose.subscribe(x=>{
      console.log("id hapus",x)
      if(x!==-1){
        
      }
    });
  }

}
