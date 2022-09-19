import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { DescriptionReadParameterPlantDto } from 'src/app/common/plant.model';
@Component({
  selector: 'app-param-card',
  standalone: true,
  imports: [CommonModule, NzCardModule,NzTypographyModule],
  templateUrl: './param-card.component.html',
  styleUrls: ['./param-card.component.scss']
})
export class ParamCardComponent implements OnInit {

  @Input() group_name!:string;
  @Input() value!:number;
  @Input() desc!:DescriptionReadParameterPlantDto[];
  constructor() { }

  ngOnInit(): void {
  }

}
