import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { en_US, NzI18nService } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NgxEchartsModule } from 'ngx-echarts';
import { GreenHouseService } from 'src/app/api-services/green-house.service';
import { GreenHouseGraphParameterDto, GreenHouseGraphParameterDtoWithLocal, GreenHouseParameterOptionDto } from 'src/app/common/greenhouse.model';
import { CurrentGreenHouseService } from 'src/app/services/current-green-house.service';
import { NzRadioModule } from 'ng-zorro-antd/radio';
@Component({
  selector: 'app-parameter',
  templateUrl: './parameter.component.html',
  styleUrls: ['./parameter.component.scss'],
  standalone:true,
  imports:[
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxEchartsModule,
    NzPageHeaderModule,
    NzFormModule,
    NzDatePickerModule,
    NzSelectModule,
    NzRadioModule,
    NzButtonModule,
    NzDividerModule
  ]
})
export class ParameterComponent implements OnInit {
  isLoading=false;
  radioValue='s';
  dateValue:any=new Date();
  linkDashboard = "";
  form = this.fb.group({
    GreenhouseId:[null, Validators.required],
    ChosenDate:[null, Validators.required],
    ChosenParameterIds:[null, Validators.required]
  });
  listOfParams:GreenHouseParameterOptionDto[]=[];
  chartOptions:{[key:string]:any}={
    // 'SpH':{init:undefined,merged:undefined},
    // 'AT':{init:undefined,merged:undefined},
    // 'AM':{init:undefined,merged:undefined},
    // 'ST':{init:undefined,merged:undefined},
    // 'SM':{init:undefined,merged:undefined},
    // 'lgI':{init:undefined,merged:undefined},
    // 'N':{init:undefined,merged:undefined},
    // 'P':{init:undefined,merged:undefined},
    // 'K':{init:undefined,merged:undefined},
  };
  chartData:{[key:string]:any}={
    // 'SpH':[],
    // 'AT':[],
    // 'AM':[],
    // 'ST':[],
    // 'SM':[],
    // 'lgI':[],
    // 'N':[],
    // 'P':[],
    // 'K':[],
  }
  constructor(
    private greenhouseService: GreenHouseService,
    private fb: UntypedFormBuilder,
    private currentGhService:CurrentGreenHouseService
  ) { }

  ngOnInit(): void {
    this.form.controls['GreenhouseId'].setValue(this.currentGhService.getId())
    this.greenhouseService.getAllParameters().subscribe(x=>{
      this.listOfParams = x
    });
    this.linkDashboard = "/dashboard/"+this.currentGhService.chosedGreenHouse.value;
  }
  submitForm():void{
    this.isLoading=true;
    this.greenhouseService.getGraphParamater(this.form.value)
        .subscribe(x=>{this.setChart(x);this.isLoading=false;}, err=>this.isLoading=false);
  }
  resetChart():void{
    this.chartOptions={};
    this.chartData={};
  }
  setChart(data:GreenHouseGraphParameterDto[]):void{
    
    this.resetChart();
    const chosenParam = this.form.controls['ChosenParameterIds'].value;
    
    for (let index = 0; index < chosenParam.length; index++) {
      const element = chosenParam[index];
      
      const opt = this.listOfParams.find(x=>x.value===element);

      this.supplyChartData(opt!!,data);
      this.supplyChart(opt!!);
      
    }
  }
  supplyChartData(param:GreenHouseParameterOptionDto, data:GreenHouseGraphParameterDto[]){
    const p = data.filter(x=>x.parameterId===param.value).map(x=>{
      const nd = new Date(Date.parse(x.createdAt.toString()));
      const local_nd = new Date((nd).setHours(nd.getHours()+7));
      const local_ndTS = [local_nd.getFullYear(), local_nd.getMonth() + 1, local_nd.getDate()].join('/')+' '+[local_nd.getHours(),local_nd.getMinutes(),local_nd.getSeconds()].join(':')
      const r= new GreenHouseGraphParameterDtoWithLocal();
      r.name=local_ndTS;
      r.value=[local_ndTS, x.value];
      return r;
    });
    this.chartData[param.value]=p;
  }

  supplyChart(data:GreenHouseParameterOptionDto):void{
    this.chartOptions[data.value]={init:undefined, merged:undefined};
    this.chartOptions[data.value].init = {
      title: {
        text: data.display
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params:any) => {
          params = params[0];
          return params.name + ' = ' + params.value[1];

          // return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' - ' + date.getHours()+':'+date.getMinutes()+':'+date.getSeconds() + ' = ' + params.data[1];
        },
        axisPointer: {
          animation: false
        }
      },
      xAxis: {
        type: 'time',
        splitLine: {
          show: false
        }
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '100%'],
        splitLine: {
          show: false
        }
      },
      series: [{
        name: 'Mocking Data',
        type: 'line',
        showSymbol: false,
        // hoverAnimation: false,
        data: this.chartData[data.value]
      }]
    };
  }
}
