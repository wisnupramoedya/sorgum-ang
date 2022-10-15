import {Component, Input, OnInit} from '@angular/core';
import {NgxEchartsModule} from "ngx-echarts";
import {GraphDataParameterDto} from "../../../../../common/parameter.model";
import {formatDate} from "@angular/common";

// @ts-ignore
@Component({
  selector: 'app-graph-parameter',
  templateUrl: './graph-parameter.component.html',
  styleUrls: ['./graph-parameter.component.scss'],
  standalone: true,
  imports: [
    NgxEchartsModule
  ],
})
export class GraphParameterComponent implements OnInit {
  options: any;
  @Input() graphData: GraphDataParameterDto | undefined;
  @Input() isMicroMode: boolean = true;

  constructor() { }

  ngOnInit(): void {
    const barData = this.isMicroMode ? this.graphData?.ParentTypeName: this.graphData?.MicroName;
    const xAxisData = this.graphData?.Values.map(value => formatDate(value.CreatedAt, "HH:mm:ss", "id-ID"));
    const data1 = this.graphData?.Values.map(value => value.Value);

    this.options = {
      legend: {
        data: [`${barData}`],
        align: 'left',
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params:any) => {
          params = params[0];
          return params.name + ' = ' + Math.round(params.value * 10000) / 10000;
        },
        axisPointer: {
          animation: false
        }
      },
      xAxis: {
        data: xAxisData,
        splitLine: {
          show: false,
        },
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '100%'],
        splitLine: {
          show: false
        }
      },
      series: [
        {
          name: `${barData}`,
          type: 'line',
          showSymbol: false,
          emphasis: {
            line: false,
          },
          data: data1,
          animationDelay: (idx: number) => idx * 10,
        },
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx: number) => idx * 5,
    };
  }

}
