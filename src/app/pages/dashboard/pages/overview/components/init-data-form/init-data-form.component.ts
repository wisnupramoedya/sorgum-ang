import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ReactiveFormsModule, UntypedFormArray, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule, NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationModule, NzNotificationService } from 'ng-zorro-antd/notification';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTableComponent, NzTableModule } from 'ng-zorro-antd/table';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { GreenHouseService } from 'src/app/api-services/green-house.service';
import { AppResponse } from 'src/app/common/app.model';
import { GreenHousePlantOptionDto } from 'src/app/common/greenhouse.model';
import { CurrentGreenHouseService } from 'src/app/services/current-green-house.service';

@Component({
  selector: 'app-init-data-form',
  templateUrl: './init-data-form.component.html',
  styleUrls: ['./init-data-form.component.scss'],
  standalone:true,
  imports:[
    CommonModule,
    ReactiveFormsModule,
    NzSwitchModule,
    NzGridModule,
    NzCardModule,
    NzButtonModule,
    NzTypographyModule ,
    // NgxEchartsModule.forChild(),
    NzIconModule,
    NzListModule,
    NzFormModule,
    // NzToolTipModule,
    NzInputModule,
    NzModalModule,
    NzPaginationModule,
    NzUploadModule,
    NzMessageModule,
    NzTableModule,
    NzSelectModule,
    NzStepsModule,
    NzInputNumberModule,
    NzDividerModule,
    NzNotificationModule,
    NzBreadCrumbModule,
    NzDatePickerModule,
    NzSpaceModule,
    NzSpinModule
  ]
})
export class InitDataFormComponent implements OnInit {
  
  editCache: { [key: string]: { [key:number]:{edit: boolean; data: any, isNew:boolean} } } = {
    'plant':{},
    'iot':{} 
  };
  indexData:{[key:string]:number}={
    'plant':0,
    'iot':0 
  }
  data:{[key:string]:any[]}={
    'plant':[],
    'iot':[]
  }
  plantsOptionsOriginal:GreenHousePlantOptionDto[]=[];
  plantsOptions:GreenHousePlantOptionDto[]=[];
  indexStepper=0;
  maxStep=1;
  minStep=0;
  form!:UntypedFormGroup;
  
  constructor(
    private fb: UntypedFormBuilder,
    private currentGH:CurrentGreenHouseService,
    private greenhouseService:GreenHouseService,
    private modal: NzModalRef,
    private notification: NzNotificationService,


  ) { }
  get Plants(): UntypedFormArray{
    return this.form.controls['Plants'] as UntypedFormArray;
  }
  get Iots(): UntypedFormArray{
    return this.form.controls['Iots'] as UntypedFormArray;
  }
  ngOnInit(): void {
    this.setInitForm();
    this.greenhouseService.getAllPlants().subscribe(data=>{
      this.plantsOptionsOriginal=data;
      this.plantsOptions=[...this.plantsOptionsOriginal];
    })
    this.form.valueChanges.subscribe(x=>console.log(x));
  }
  addRow(key:string):void{
  
    if(key==='plant'){
      const f = this.fb.group({
        PlantId:[],
        PlantName:[],
        N:[]
      });
      this.Plants.insert(0,f);
      this.Plants.controls = [...this.Plants.controls];
      this.fillNewRow(key,f);
      
    }else{
      const f = this.fb.group({
        Name:[],
        Code:[],
        Secret:[]
      });
      this.Iots.insert(0,f);
      this.Iots.controls = [...this.Iots.controls];
      this.fillNewRow(key,f);
    }
    this.form.updateValueAndValidity();
  }
  fillNewRow(key:string, data:UntypedFormGroup):void{
    const idx = 0;
    this.editCache[key]={
      [idx]:{
        data:data.value,
        edit:true,
        isNew:true
      }
    };
    this.indexData[key]++;
    
  }
  startEdit(key:string, id: number): void {
    let data =null;
    if(key==='plant'){
      data=  this.Plants.controls.find((v,i,o)=>i===id);
      this.adjustPlantOption(true,data?.get('PlantId')?.value);
    }
    else{
      data=  this.Iots.controls.find((v,i,o)=>i===id);
    }
    this.editCache[key]={
      [id]:{
        data:data?.value,
        edit:true,
        isNew:false
      }
    };
  }
  cancelEdit(key:string, id: number): void {
    if(this.editCache[key][id].isNew){
      this.deleteRow(key,id);
    }else{
      if(key==='plant'){
        const data =  this.Plants.controls.find((v,i,o)=>i===id);
        data?.setValue(this.editCache[key][id].data);
        this.adjustPlantOption(false);

      }else{
        const data =  this.Iots.controls.find((v,i,o)=>i===id);
        data?.setValue(this.editCache[key][id].data);
      }
    }
    
    delete this.editCache[key][id];
  }
  deleteRow(key:string, id: number): void {
    if(key==='plant'){
      this.Plants.removeAt(id);
      this.Plants.controls=[...this.Plants.controls];
      this.adjustPlantOption(false);
    }else{
      this.Iots.removeAt(id);
      this.Iots.controls=[...this.Iots.controls];
    }

  }
  adjustPlantOption(isEdit:boolean, id:number|null=null):void{
    const usedOptions = this.Plants.controls.map((v,i,abs)=>v.get('PlantId')?.value);
    if(isEdit===false){
      this.plantsOptions = this.plantsOptionsOriginal.filter(x=>!usedOptions.includes(x.value));
    }
    else{
      this.plantsOptions = this.plantsOptionsOriginal.filter(x=>!usedOptions.includes(x.value)||x.value ===id);
    }
  }
  saveEdit(key:string, id: number): void {
    if(key==='plant'){
      const temp = this.Plants.controls.find((v,i,o)=>i===id);
      const plantName = this.plantsOptions.find(x=>x.value===temp?.get('PlantId')?.value)?.display;
      temp?.get('PlantName')?.setValue(plantName);
      this.adjustPlantOption(false);
    }
    delete this.editCache[key][id];
  }
  setInitForm():void{
    this.form = this.fb.group({
      GreenhouseId:[this.currentGH.chosedGreenHouse.value],
      Plants:this.fb.array([]),
      Iots:this.fb.array([]),
    });
  }
  
  preStep(): void {
    this.indexStepper -= 1;
  }

  nextStep(): void {
    this.indexStepper += 1;
  }

  submit(): void {
    console.log(this.form.value);
    if(this.form.valid){
      this.greenhouseService.initDataGreenHouse(this.form.value).subscribe(
        (res:AppResponse)=>{
          this.notification.success('Sukses',res.message);
          this.modal.destroy();
        },
        (err:HttpErrorResponse)=>{
          this.notification.error('Error',err.error.message);
        }
        );
    }
  }
  //TODO Validator Code IoT
  
}
