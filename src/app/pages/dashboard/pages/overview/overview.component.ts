import { CommonModule } from '@angular/common';
import {
  AfterContentInit,
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as echart from 'echarts';
import { EChartsOption } from 'echarts';
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
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
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
import { filter, switchMap } from 'rxjs/operators';
import { GreenHouseService } from 'src/app/api-services/green-house.service';
import { HubService } from 'src/app/api-services/hub.service';
import { HubAPI } from 'src/app/apis/hub.api';
import {
  GreenHouseDetailDto,
  GreenHouseParameterOptionDto,
  IoTChangeStatusDto,
  IoTSubmitBroadcast,
  PlantsConditionDto,
} from 'src/app/common/greenhouse.model';
import { CommandIotComponent } from './components/command-iot/command-iot.component';
import { InitDataFormComponent } from './components/init-data-form/init-data-form.component';
import * as signalR from '@microsoft/signalr';
import { RouterModule } from '@angular/router';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { McCardComponent } from './components/mc-card/mc-card.component';
import { ParamCardComponent } from './components/param-card/param-card.component';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { MicrocontrollerService } from 'src/app/api-services/microcontroller.service';
import {
  MicroItemDto,
  MicroItemMinimalDto,
  MicrosIdenity,
} from 'src/app/common/microcontroller.model';
import { PlantParameterService } from 'src/app/api-services/plant-parameter.service';
import { ParamOverv, ParamOverview } from 'src/app/common/PlantParameter.model';
import { CurrentGreenHouseService } from 'src/app/services/current-green-house.service';

export class CheckSelect {
  label!: string;
  value!: any;
  checked!: boolean;
}

export class MicroItemDtoModified extends MicroItemDto {
  data_sensor!: ParamOverview[];
}

@Component({
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxEchartsModule,
    RouterModule,
    NzCardModule,
    NzButtonModule,
    NzTypographyModule,
    NzIconModule,
    NzInputNumberModule,
    NzNotificationModule,
    NzPageHeaderModule,
    McCardComponent,
    ParamCardComponent,
    NzCheckboxModule,
    NzDropDownModule,
  ],
})
export class OverviewComponent implements OnInit, OnDestroy {
  landId!: number;
  mcs: MicroItemMinimalDto[] = [];
  pps: string[] = [];

  mcDataTemp: MicroItemDto[] = [];
  ppDataTemp: ParamOverview[] = [];
  mcppData: MicroItemDtoModified[] = [];
  constructor(
    private acRoute: ActivatedRoute,
    private mcService: MicrocontrollerService,
    private plantParamService: PlantParameterService,
    private curGh: CurrentGreenHouseService
  ) {
    // this.landId = this.acRoute.snapshot.params['landId'];
    // this.acRoute.params.subscribe(x=>this.landId = x['landId']);
  }
  ngOnInit(): void {
    console.log(this.landId);
    // this.acRoute.params.subscribe(x=>this.landId = x['landId']);
    
    this.curGh.chosedGreenHouse.subscribe(x=>this.landId=x);

    this.mcService.showMinimal(this.landId).subscribe((x) => {
      this.mcs = x;
      this.checkOptionsMc = x.map((y) => {
        const temp: CheckSelect = {
          checked: true,
          label: y.Name,
          value: y.Id,
        };
        return temp;
      });
    });
    this.plantParamService.showMinimalParam(this.landId).subscribe((x) => {
      this.pps = x;
      this.checkOptionsPp = x.map((y) => {
        const temp: CheckSelect = {
          checked: true,
          label: y,
          value: y,
        };
        return temp;
      });
      console.log(this.checkOptionsPp);
    });
    setTimeout(()=>{
      this.loadMcs();
    },1000);
  }
  ngOnDestroy(): void {}
  allCheckedMc = false;
  indeterminateMc = true;
  allCheckedPp = false;
  indeterminatePp = true;
  checkOptionsMc: CheckSelect[] = [];
  checkOptionsPp: CheckSelect[] = [];

  updateAllCheckedMc(): void {
    this.indeterminateMc = false;
    if (this.allCheckedMc) {
      this.checkOptionsMc = this.checkOptionsMc.map((item) => ({
        ...item,
        checked: true,
      }));
    } else {
      this.checkOptionsMc = this.checkOptionsMc.map((item) => ({
        ...item,
        checked: false,
      }));
    }
    this.loadMcs();
  }
  updateAllCheckedPp(): void {
    this.indeterminatePp = false;
    if (this.allCheckedPp) {
      this.checkOptionsPp = this.checkOptionsPp.map((item) => ({
        ...item,
        checked: true,
      }));
    } else {
      this.checkOptionsPp = this.checkOptionsPp.map((item) => ({
        ...item,
        checked: false,
      }));
    }
    this.loadPps();
  }

  loadMcs(): void {
    const temp: MicrosIdenity = {
      Ids: this.checkOptionsMc.filter((x) => x.checked).map((x) => x.value),
    };
    this.mcService.showOverviewMicro(this.landId, temp)
    
    .subscribe((x) => {
      this.mcDataTemp = x;
      this.formatLoad();

    });
  }
  // loadMcs2():void{
  //   const temp: MicrosIdenity = {
  //     Ids: this.checkOptionsMc.filter((x) => x.checked).map((x) => x.value),
  //   };
  //   this.mcService.showOverviewMicro(this.landId, temp).subscribe((x) => {
  //     this.mcDataTemp = x;
      
  //   });
  // }
  loadPps(): void {
    this.loadMcs();
    // const temp: ParamOverv={
    //   Ids:this.checkOptionsMc.filter(x=>x.checked).map(x=>x.value),
    //   GNames:this.checkOptionsPp.filter(x=>x.checked).map(x=>x.value)
    // };
    // this.plantParamService.showParamOverview(this.landId, temp).subscribe(x=>this.ppDataTemp = x);
  }
  formatLoad(): void {
    const temp: ParamOverv = {
      Ids: this.checkOptionsMc.filter((x) => x.checked).map((x) => x.value),
      GNames: this.checkOptionsPp.filter((x) => x.checked).map((x) => x.value),
    };
    this.plantParamService
      .showParamOverview(this.landId, temp)
      .subscribe((x) => {
        console.log(x);
        this.ppDataTemp = x;
        const temp: MicroItemDtoModified[] = this.mcDataTemp.map((x) => {
          const yy: MicroItemDtoModified = {
            Description: x.Description,
            Id: x.Id,
            LandId: x.LandId,
            LandName: x.LandName,
            Name: x.Name,
            RegionId: x.RegionId,
            RegionName: x.RegionName,
            Status: x.Status,
            data_sensor: this.ppDataTemp.filter((y) => y.MicroId === x.Id),
            PlantId:x.PlantId,
            PlantName:x.PlantName
          };
          // console.log(yy);
          
          return yy;
        });
        this.mcppData = temp;

        
        console.log(this.mcppData);
        // console.log(this.mcppData[0].data_sensor);
      });
  }
  updateSingleCheckedMc(): void {
    if (this.checkOptionsMc.every((item) => !item.checked)) {
      this.allCheckedMc = false;
      this.indeterminateMc = false;
    } else if (this.checkOptionsMc.every((item) => item.checked)) {
      this.allCheckedMc = true;
      this.indeterminateMc = false;
    } else {
      this.indeterminateMc = true;
    }
    this.loadMcs();
  }
  updateSingleCheckedPp(): void {
    if (this.checkOptionsPp.every((item) => !item.checked)) {
      this.allCheckedPp = false;
      this.indeterminatePp = false;
    } else if (this.checkOptionsPp.every((item) => item.checked)) {
      this.allCheckedPp = true;
      this.indeterminatePp = false;
    } else {
      this.indeterminatePp = true;
    }
    this.loadPps();
  }
  // linkGraph = "";
  // isModalConditionVisible=false;
  // idConditionChosen =-1;
  // conditionShown: PlantsConditionDto = {
  //   rFanTime:0,
  //   rFanMode:0,
  //   rServoTime:0,
  //   rWaterPumpTime:0,
  //   rLampState:0,
  // };
  // greenhouseData!:GreenHouseDetailDto;
  // // charts:any[]=[];
  // // updateOptions!:EChartsOption;
  // // chartOption!: EChartsOption ;
  // chartOptions:{[key:string]:any}={
  //   // 'SpH':{init:undefined,merged:undefined},
  //   // 'AT':{init:undefined,merged:undefined},
  //   // 'AM':{init:undefined,merged:undefined},
  //   // 'ST':{init:undefined,merged:undefined},
  //   // 'SM':{init:undefined,merged:undefined},
  //   // 'lgI':{init:undefined,merged:undefined},
  //   // 'N':{init:undefined,merged:undefined},
  //   // 'P':{init:undefined,merged:undefined},
  //   // 'K':{init:undefined,merged:undefined},
  // };

  // chartData:{[key:string]:any}={
  //   // 'SpH':[],
  //   // 'AT':[],
  //   // 'AM':[],
  //   // 'ST':[],
  //   // 'SM':[],
  //   // 'lgI':[],
  //   // 'N':[],
  //   // 'P':[],
  //   // 'K':[],
  // }
  // // values:{[key:string]:any}={
  // //   'SpH':7.0,
  // //   'AT':26,
  // //   'AM':50,
  // //   'ST':20,
  // //   'SM':70,
  // //   'lgI':0,
  // //   'N':0,
  // //   'P':0,
  // //   'K':0,
  // // }
  // // private oneSec = 1000;//24 * 3600 * 1000;
  // // private now!: Date;
  // // private value: number =7.0 ;
  // // private data!: any[];
  // // private timer: any;
  // hubCon!:signalR.HubConnection;
  // listOfParams:GreenHouseParameterOptionDto[]=[];
  // i = 0;
  // constructor(
  //   private modalService: NzModalService,
  //   private router:Router,
  //   private activatedRouter:ActivatedRoute,
  //   private greenHouseService:GreenHouseService,
  //   private hubService:HubService,

  // ) { }

  // ngOnDestroy(): void {
  //   this.hubCon.invoke("LeaveRoom", this.greenhouseData.id.toString());
  // }
  // showModalCondition(id:number):void{
  //   this.idConditionChosen=id;
  //   this.conditionShown = this.greenhouseData.plants.find(x=>x.id===id)?.condition ?? {
  //     rFanTime:0,
  //     rFanMode:0,
  //     rServoTime:0,
  //     rWaterPumpTime:0,
  //     rLampState:0,
  //   };
  //   this.conditionShown.rFanTime = Math.round(this.conditionShown.rFanTime) === 0?0: this.conditionShown.rFanTime;
  //   this.conditionShown.rFanMode = Math.round(this.conditionShown.rFanMode);
  //   this.conditionShown.rServoTime = Math.round(this.conditionShown.rServoTime) === 0?0: this.conditionShown.rServoTime;
  //   this.conditionShown.rWaterPumpTime = Math.round(this.conditionShown.rWaterPumpTime) === 0?0: this.conditionShown.rWaterPumpTime;
  //   this.conditionShown.rLampState = Math.round(this.conditionShown.rLampState) === 0?0: this.conditionShown.rLampState;
  //   console.log(this.conditionShown);
  //   this.isModalConditionVisible=true;
  // }
  // handleCancelModalCondition():void{
  //   this.isModalConditionVisible=false;
  //   this.idConditionChosen=-1;
  // }
  // openCommandIoT(id:number):void{
  //   this.modalService.create({
  //     nzContent: CommandIotComponent,
  //     nzComponentParams:{
  //       IoTId:id
  //     },
  //     nzClosable:true,
  //     nzMaskClosable:true,
  //     nzCloseOnNavigation:true,
  //     nzKeyboard:true,
  //     nzWidth:'80vw'
  //   }).afterClose.subscribe(x=>console.log(x))
  // }

  // ngOnInit(): void {
  //   this.greenhouseData = this.activatedRouter.snapshot.data['data'];
  //   this.linkGraph = "/dashboard/"+this.greenhouseData.id+"/parameter";
  //   this.greenHouseService.getAllParameters()
  //   .subscribe(x=>{
  //     this.listOfParams =x;
  //     this.supplyDemo();
  //   });
  //   if(!(this.greenhouseData.plants.length>0)){
  //     this.modalService.create({nzContent: InitDataFormComponent,
  //       nzClosable:false,
  //       nzMaskClosable:false,
  //       nzCloseOnNavigation:true,
  //       nzKeyboard:false,
  //       nzWidth:'80vw'
  //     }).afterClose.pipe(switchMap(x=>this.greenHouseService.getGreenHouseById(this.greenhouseData.id)))

  //       .subscribe(x=>this.greenhouseData=x);
  //   }
  //   this.hubCon = this.hubService.buildHub(HubAPI.Overview);
  //   this.hubCon.start()
  //              .then(x=>{
  //                 console.log("hub connected");
  //                 this.hubCon.invoke("JoinRoom", this.greenhouseData.id.toString());
  //               })
  //             .catch(e => console.log("hub not connected",e));
  //   this.hubCon.on('IoTChangeStatus', (data:IoTChangeStatusDto)=>{
  //     const t = this.greenhouseData.iots.find(x=>x.id===data.id);
  //     if(t!==null && t!==undefined){
  //       t.connected =data.isActive;
  //     }
  //   });
  //   this.hubCon.on('IoTSentData', (data:IoTSubmitBroadcast)=>{
  //     // console.log(this.i);
  //     this.i++;
  //     const dtData = new Date(Date.parse(data.createdAt.toString()));
  //     const dtDataTS = [dtData.getFullYear(), dtData.getMonth() + 1, dtData.getDate()].join('/')+' '+[dtData.getHours(),dtData.getMinutes(),dtData.getSeconds()].join(':')
  //     const dataIot = data.dataIot.find(x=>x.greenHousePlantId === this.greenhouseData.plants[0].id);
  //     this.greenhouseData.plants[0].condition = dataIot?.result ?? {
  //       rFanTime:0,
  //       rFanMode:0,
  //       rServoTime:0,
  //       rWaterPumpTime:0,
  //       rLampState:0,
  //     };
  //     dataIot?.details.forEach(element => {
  //       const key = element.code;
  //       if (Object.prototype.hasOwnProperty.call(this.chartData, key)) {
  //         if(this.chartData[key].length>300){
  //           this.chartData[key].shift();
  //         }
  //         this.chartData[key].push({
  //           name: dtDataTS,
  //           value:[
  //             dtDataTS,
  //             Math.round((element.value + Number.EPSILON) * 100) / 100
  //           ]
  //         });
  //         this.chartOptions[key].merged = {
  //           series: [{
  //             data: this.chartData[key]
  //           }]
  //         };
  //       }
  //     });

  //   });
  // }

  // supplyDemo():void{
  //   for(const p of this.listOfParams){
  //       console.log(this.chartData,p)
  //       let titlex = p.display;
  //       this.chartOptions[p.code]={init:undefined,merged:undefined};
  //       this.chartData[p.code]=[];
  //       this.chartOptions[p.code].init = {
  //         title: {
  //           text: titlex
  //         },
  //         tooltip: {
  //           trigger: 'axis',
  //           formatter: (params:any) => {
  //             params = params[0];
  //             return params.name + ' = ' + params.value[1];

  //             // return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' - ' + date.getHours()+':'+date.getMinutes()+':'+date.getSeconds() + ' = ' + params.data[1];
  //           },
  //           axisPointer: {
  //             animation: false
  //           }
  //         },
  //         xAxis: {
  //           type: 'time',
  //           splitLine: {
  //             show: false
  //           }
  //         },
  //         yAxis: {
  //           type: 'value',
  //           boundaryGap: [0, '100%'],
  //           splitLine: {
  //             show: false
  //           }
  //         },
  //         series: [{
  //           name: 'Mocking Data',
  //           type: 'line',
  //           showSymbol: false,
  //           // hoverAnimation: false,
  //           data: this.chartData[p.code]
  //         }]
  //       };

  //   }

  // }
}
