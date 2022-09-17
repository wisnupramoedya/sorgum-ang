import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { CardNComponent } from 'src/app/components/card-n/card-n.component';

@Component({
  selector: 'app-land-camera',
  standalone: true,
  templateUrl: './land-camera.component.html',
  styleUrls: ['./land-camera.component.scss'],
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
    ReactiveFormsModule,
    NzPageHeaderModule,
    NzFormModule
  ],
})
export class LandCameraComponent implements OnInit {
  form:FormGroup = this.fb.nonNullable.group({
    MicrocontrollerId: this.fb.nonNullable.control(0,{validators:[Validators.required]}),
    Vertical: this.fb.nonNullable.control(50),
    Horizontal: this.fb.nonNullable.control(50),
    Zoom: this.fb.nonNullable.control(0)
  });
  slider1 = 0;
  slider2 = 0;
  slider3 = 0;
  slider4 = 0;
  cc=null;
  isPinnedView =  false;
  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }
  pinCamera():void{
    this.isPinnedView = !this.isPinnedView;
  }
  checkColor():void{
    console.log(this.cc);
    
  }


}
