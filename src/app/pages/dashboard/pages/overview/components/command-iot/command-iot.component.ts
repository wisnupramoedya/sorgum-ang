import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSwitchComponent, NzSwitchModule } from 'ng-zorro-antd/switch';

@Component({
  selector: 'app-command-iot',
  templateUrl: './command-iot.component.html',
  styleUrls: ['./command-iot.component.scss'],
  standalone:true,
  imports:[
    CommonModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzFormModule,
    NzListModule,
    NzModalModule,
    NzDividerModule,
    NzSwitchModule
  ]
})
export class CommandIotComponent implements OnInit {
  @Input() IoTId!:number;
  form!: UntypedFormGroup;
  commands:{name:string, varName:string}[]=[
    {
      name:'Paksa kipas berhenti',
      varName:'ForceFanStop'
    },
    {
      name:'Paksa humidifier berhenti',
      varName:'ForceHumidifierStop'
    },
    {
      name:'Paksa ventilasi berhenti',
      varName:'ForceServoStop'
    },
    {
      name:'Paksa pompa air berhenti',
      varName:'ForceWaterPumpStop'
    },
    {
      name:'Paksa lampu berhenti',
      varName:'ForceLampStop'
    },
  ]
  constructor(
    private fb: UntypedFormBuilder
  ) { }

  ngOnInit(): void {
    this.setInitForm();
  }
  setInitForm():void{
    this.form = this.fb.group({
      IoTId:[],
      Instruction:this.fb.group({
        ForceFanStop:[],
        ForceHumidifierStop:[],
        ForceServoStop:[],
        ForceWaterPumpStop:[],
        ForceLampStop:[],
      })
    })
  }
  switchChange(event:Event,varName:string):void{
    this.form.get('Instruction')?.get(varName)?.setValue(event);
    this.form.updateValueAndValidity();
  }
  submit():void{
    console.log(this.form.value);
  }
}
