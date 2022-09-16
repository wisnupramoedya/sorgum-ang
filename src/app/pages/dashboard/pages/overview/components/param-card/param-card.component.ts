import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
@Component({
  selector: 'app-param-card',
  standalone: true,
  imports: [CommonModule, NzCardModule,NzTypographyModule],
  templateUrl: './param-card.component.html',
  styleUrls: ['./param-card.component.scss']
})
export class ParamCardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
