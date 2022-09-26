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
import {
  CreateDescriptionParameter,
  CreateParameter,
  DescriptionCreateParameter,
  ParamSelectItem,
  UpdateDescriptionParameter,
  UpdateParameter
} from 'src/app/common/PlantParameter.model';
import { PlantService } from 'src/app/api-services/plant.service';
import { filter, switchMap, tap } from 'rxjs';
import { NzNotificationModule, NzNotificationService } from 'ng-zorro-antd/notification';
import { PlantParameterService } from 'src/app/api-services/plant-parameter.service';
import {NzSelectModule} from "ng-zorro-antd/select";

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
    NzSelectModule,
    NzNotificationModule
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
    LatinName: this.fb.nonNullable.control('', {
      validators: [Validators.required],
    }),
    Description: this.fb.nonNullable.control(''),
  });
  formParameter: FormGroup = this.fb.nonNullable.group({
    Parameters: this.fb.nonNullable.array([]),
  })
  parameterItems: ParamSelectItem[] = [];
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
    private http: HttpClient,
    private notification: NzNotificationService,
    private plantService: PlantService,
    private plantParameterService: PlantParameterService,
  ) {}

  ngOnInit(): void {
    this.insertDataToForm();
    this.plantParameterService.showAllParam()
      .subscribe(x => this.parameterItems = x);

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
        Id: this.fb.nonNullable.control(element.Id, {
          validators: [Validators.required],
        }),
        ParentTypeId: this.fb.nonNullable.control(element.ParentTypeId, {
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
        Color: this.fb.nonNullable.control(element.Color, {
          validators: [Validators.required],
        }),
      });
      temp.push(tempF);
    }
    return temp;
  }


  updatePlant():void{
    console.log(this.form.valid, this.form.value);

    if(this.form.valid){
      this.plantService.update(this.form.controls['Id'].value, {
        Description: this.form.controls['Description'].value,
        LatinName: this.form.controls['LatinName'].value,
        Name: this.form.controls['Name'].value
      }).pipe(
        tap(()=>this.notification.create(
          'success',
          'Sukses',
          'Pembaharuan data tanaman berhasil.'
        ))
      )
      .subscribe(x=>{});
    }

  }
  newParameter(): FormGroup {
    return this.fb.nonNullable.group({
      Id: this.fb.nonNullable.control(0),
      ParentTypeId: this.fb.nonNullable.control(0, {
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
      Color: this.fb.nonNullable.control('#000000', {
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
      console.log("Buat group plant parameter baru");

      const descs:DescriptionCreateParameter[]=[];
      const tempArr = newDesc as FormArray;
      for (let index = 0; index < tempArr.length; index++) {
        const element = tempArr.at(index);
        const temp:DescriptionCreateParameter={
          Description:element.get('Description')?.value,
          MaxValue:element.get('MaxValue')?.value,
          MinValue:element.get('MinValue')?.value,
          Color:element.get('Color')?.value,
        };
        descs.push(temp);
      }
      // jika allnew
      console.log("allnew");

      const obj:CreateParameter={
        PlantId: this.data.Id,
        ParentTypeId:param.get('ParentTypeId')?.value,
        Descriptions:descs
      }
      console.log(obj);
      this.plantParameterService.createGroup(obj)
      .pipe(

        tap(()=>this.notification.create(
          'success',
          'Sukses',
          'Submit grup baru parameter tanaman berhasil.'
        )))
      .subscribe(x=>{
        const param = this.Paramete.at(idx_parameter);
        const descArr = (this.Paramete.at(idx_parameter).get('Descriptions') as FormArray);
        for (let index = 0; index < descArr.length; index++) {
          const descParam = descArr.at(index);
          descParam.get('Id')?.setValue(x);
          descParam.updateValueAndValidity();
        }
      param.markAsPristine();

      });

    }else{
      console.log("jika update hanya ParentTypeId");
      // jika update hanya ParentTypeId
      // const ids:number[]=[];
      // for (let index = 0; index < (newDesc as FormArray).length; index++) {
      //   const element = (newDesc as FormArray).at(index);
      //   ids.push(element.get('Id')?.value)
      // }
      const obj:UpdateParameter={
        Id:param.get('Id')?.value,
        ParentTypeId:param.get('ParentTypeId')?.value
      }
      console.log(obj);
      this.plantParameterService.updateGroup(this.data.Id,obj)
      .pipe(
        tap(()=>this.notification.create(
          'success',
          'Sukses',
          'Pembaharuan grup parameter tanaman berhasil.'
        )))
      .subscribe(x=>{
        this.Paramete.controls[idx_parameter].get('ParentTypeId')?.markAsPristine();
      });
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

    if(descParam.get('Id')?.value !== 0){
      // update
      console.log("update DescriptionParameter");
      const obj: UpdateDescriptionParameter={
        Description: descParam.get('Description')?.value,
        MaxValue: descParam.get('MaxValue')?.value,
        MinValue: descParam.get('MinValue')?.value,
        Color:descParam.get('Color')?.value,
      }
      console.log(obj);
      this.plantParameterService.update(descParam.get('Id')?.value,obj)
      .pipe(
        tap(()=>this.notification.create(
          'success',
          'Sukses',
          'Pembaharuan parameter tanaman berhasil.'
        )))
      .subscribe(x=>{

      });
    }
    else{
      // create new
      console.log("create new DescriptionParameter");
      const obj: CreateDescriptionParameter={
        PlantId: this.data.Id,
        Id: param.get('Id')?.value,
        Description: descParam.get('Description')?.value,
        MaxValue: descParam.get('MaxValue')?.value,
        MinValue: descParam.get('MinValue')?.value,
        Color: descParam.get('Color')?.value,

      }
      console.log(obj);
      this.plantParameterService.create(obj)
      .pipe(
        tap(()=>this.notification.create(
          'success',
          'Sukses',
          'Submit parameter baru tanaman berhasil.'
        )))
      .subscribe(x=>{
        console.log("id baru parameter",x);
        descParam.get('Id')?.setValue(x);
        descParam.updateValueAndValidity();
      });

    }
  }

  deleteParameter(i:number):void{
    const d = (this.Paramete.at(i) as FormGroup);
    if(this.isAllNewDescriptionParameter(this.Paramete.at(i).get('Descriptions'))){
      this.Paramete.removeAt(i);
      return;
    }
    this.modalService.confirm({
      nzTitle: 'Anda yakin ingin menghapus parameter ini?',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        const parameter = {
          Id: d.controls['Id'].value,
          PlantId: this.data.Id
        }
        console.log("Delete: " + JSON.stringify(parameter));
        return parameter;
      },
      nzCancelText: 'No',
      nzOnCancel: () => {
        console.log('Cancel');
        return -1;
      }
    }).afterClose
    .pipe(
      // tap(x=>console.log(x)),
      filter(x=>x!==-1),
      switchMap(x=>{
          return this.plantParameterService.deleteGroup(this.data.Id, x);
      }),
      tap(()=>this.notification.create(
        'success',
        'Sukses',
        'Hapus grup parameter berhasil.'
      ))
    )
    .subscribe(x=>{
        this.removeParameter(i);
    });
  }
  deleteDescParameter(i:number, j:number):void{
    const d = (this.DescParamete(i).controls[j] as FormGroup);
    if(d.controls['Id'].value ===0){
      this.removeDescriptionParameter(i,j);
      return;
    }
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
    }).afterClose
    .pipe(
      filter(x=>x!==-1),
      switchMap(x=>this.plantParameterService.delete(x)),

      tap(()=>this.notification.create(
        'success',
        'Sukses',
        'Hapus parameter berhasil.'
      ))
    )
    .subscribe(x=>{
        this.removeDescriptionParameter(i,j);
    });
  }

  deletePlant():void{
    console.log('menghapus tanaman dengan id', this.data.Id);

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
    })
    .afterClose
    .pipe(
      filter(x=>x!==-1),
      switchMap(x=>{
          return this.plantService.delete(x);
      }),
      tap(()=>this.notification.create(
        'success',
        'Sukses',
        'Hapus tanaman berhasil.'
      ))
    )
    .subscribe(x=>{
      this.modal.close(this.data.Id);
    });
  }

}
