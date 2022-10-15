import { CommonModule } from '@angular/common';
import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NgxEchartsModule } from 'ngx-echarts';
import { RouterModule } from '@angular/router';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { MicrocontrollerService } from 'src/app/api-services/microcontroller.service';
import { PlantParameterService } from 'src/app/api-services/plant-parameter.service';
import { CurrentGreenHouseService } from 'src/app/services/current-green-house.service';
import {LandItemMinimalDto} from "../../../../common/land.model";
import {DashboardService} from "../../../../api-services/dashboard.service";
import {DashboardDataDto, DashboardSensorDto} from "../../../../common/dashboard.model";
import {NzDividerModule} from "ng-zorro-antd/divider";


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
    NzCheckboxModule,
    NzDropDownModule,
    NzDividerModule
  ],
})
export class OverviewComponent implements OnInit, OnDestroy {
  landId!: number;
  land!: LandItemMinimalDto;
  dashboardDataDtoList: DashboardDataDto[] = [];
  dashboardSensorDtoList: DashboardSensorDto[] = [];

  constructor(
    private acRoute: ActivatedRoute,
    private mcService: MicrocontrollerService,
    private plantParamService: PlantParameterService,
    private curGh: CurrentGreenHouseService,
    private dashboardService: DashboardService
  ) {
  }
  ngOnInit(): void {
    this.curGh.chosedGreenHouse.subscribe(x=>this.landId=x);
    this.dashboardService.showDashboardOverview(this.landId).subscribe(x => this.dashboardDataDtoList = x);
    this.dashboardService.showSensorOverview(this.landId).subscribe(x => this.dashboardSensorDtoList = x);
  }
  ngOnDestroy(): void {}


  formatLoad(): void {
  }
}
