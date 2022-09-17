import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzFormModule } from 'ng-zorro-antd/form';
import { Router, RouterModule } from '@angular/router';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { FormsModule } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  switchMap,
  tap
} from 'rxjs/operators';
import { LandService } from 'src/app/api-services/land.service';
import { CardNComponent } from 'src/app/components/card-n/card-n.component';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { of } from 'rxjs';

@Component({
  selector: 'app-camera-list', 
  standalone: true,
  templateUrl: './camera-list.component.html',
  styleUrls: ['./camera-list.component.scss'],
  imports: [
    CommonModule,
    NzFormModule,
    RouterModule,
    NzCardModule,
    NzButtonModule,
    NzPaginationModule,
    NzInputModule,
    NzListModule,
    NzGridModule,
    NzUploadModule,
    NzIconModule,
    NzModalModule,
    CardNComponent,
    NzSliderModule,
    FormsModule,
    NzPageHeaderModule
  ],
})
export class CameraListComponent implements OnInit {
  slider1 = 0;
  slider2 = 0;
  slider3 = 0;
  slider4 = 0;
  cc=null;

  constructor() { }

  ngOnInit(): void {
    
  }
  checkColor():void{
    console.log(this.cc);
    
  }

}
