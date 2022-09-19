import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ReadPlantDto } from 'src/app/common/plant.model';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { RegionsItemDto } from 'src/app/common/region.model';
import { RegionService } from 'src/app/api-services/region.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { debounceTime, distinctUntilChanged, startWith, switchMap } from 'rxjs';
import { CreateLandRegionComponent } from './create-land-region/create-land-region.component';
import { UpdateLandRegionComponent } from './update-land-region/update-land-region.component';
import { PlantService } from 'src/app/api-services/plant.service';

@Component({
  selector: 'app-land-region',
  standalone: true,
  templateUrl: './land-region.component.html',
  styleUrls: ['./land-region.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzTableModule,
    NzButtonModule,
    NzIconModule,
    NzPageHeaderModule,
  ],
})
export class LandRegionComponent implements OnInit {
  data: RegionsItemDto[] = [];
  landId!:number;
  
  form:FormGroup = this.fb.nonNullable.group({
    Search: this.fb.nonNullable.control('',{validators:[Validators.required]}),
    Page: this.fb.nonNullable.control(1, {validators:[Validators.required]}),
    N: this.fb.nonNullable.control(10,{validators:[Validators.required]})
  });
  dataTotal = 0;
  constructor(
    private fb: FormBuilder,
    private modalService: NzModalService,
    private regionService: RegionService,
    private router: Router,
    private plantService:PlantService,
    private acRoute:ActivatedRoute

  ) { }

  ngOnInit(): void {
    console.log(this.acRoute.snapshot.data);
    
    this.landId = this.acRoute.snapshot.data['landId'];
    // this.acRoute.params.subscribe(x=>this.landId =x['landId']);
    console.log(this.landId);
    this.form.valueChanges.pipe(
      startWith(
        this.form.value
        ),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(x=>this.regionService.search(x))
    ).subscribe(
      (res: any)=>{
        console.log(res);
        this.data = res.Data;
        this.dataTotal=res.NTotal;
      }
    );
  }
  changePageIndex(event:number):void{
    this.form.controls['Page'].setValue(event);
  }
  changePageSize(event:number):void{
    this.form.controls['N'].setValue(event);
  }
  showModalCreate():void{
    this.modalService.create({
      nzContent:CreateLandRegionComponent,
      nzComponentParams:{
        land_id:this.landId
      }
    }).afterClose.subscribe(id=>{
      this.form.updateValueAndValidity();
    });
  }
  showModalUpdate(id:number):void{
    const dt = this.data.filter(x=>x.Id === id )[0];
    this.modalService.create({
      nzContent:UpdateLandRegionComponent,
      nzComponentParams:{
        region: dt
      }
    }).afterClose.subscribe(id=>{
      this.form.updateValueAndValidity();
    });
  }
  
}
