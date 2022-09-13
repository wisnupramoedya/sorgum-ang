import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCardModule } from 'ng-zorro-antd/card';

@Component({
  selector: 'app-card-n',
  standalone: true,
  imports: [
    CommonModule,
    NzIconModule,
    NzCardModule
  ],
  template: `
    <nz-card class="card-n-container">
      <span nz-icon [nzType]="'home'"></span>
      <div class="status-info">
        <div>{{name}}</div>
        <div>{{n}}</div>
      </div>
    </nz-card>
  `,
  styles: [
    `::ng-deep.card-n-container{
      
      [nz-icon]{
        font-size:2em;
        padding:2px;
        padding-left:4px;
      }
      .ant-card-body{
        padding: 2px;
        display:flex;
        flex-direction: row;
        align-content: center;
        justify-content: center;
        align-items: center;
      }
      .status-info{
        div:first-child{
          padding:0px 1em 0px 1em;
          text-align:center;
        }
        div:last-child{
          padding:0px 1em 0px 1em;
          text-align:center;
          /* font-size:1.25em; */
        }
      }
    }`,
    
  ]
})
export class CardNComponent implements OnInit {
  @Input() name!:string;
  @Input() n!:number;
  constructor() { }

  ngOnInit(): void {
  }

}
