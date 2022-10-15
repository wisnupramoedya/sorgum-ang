import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { CardNComponent } from 'src/app/components/card-n/card-n.component';
import { CurrentGreenHouseService } from 'src/app/services/current-green-house.service';
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  switchMap,
} from 'rxjs/operators';
import { NzTableModule, NzTableQueryParams } from 'ng-zorro-antd/table';
import { MicroItemDto } from 'src/app/common/microcontroller.model';
import { MicrocontrollerService } from 'src/app/api-services/microcontroller.service';

@Component({
  selector: 'app-microcontroller-list',
  standalone: true,
  templateUrl: './microcontroller-list.component.html',
  styleUrls: ['./microcontroller-list.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
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
    NzTableModule
  ],
})
export class MicrocontrollerListComponent implements OnInit {
  data: MicroItemDto[] = [];

  form:FormGroup = this.fb.nonNullable.group({
    Search: this.fb.nonNullable.control('',{validators:[Validators.required]}),
    Page: this.fb.nonNullable.control(1, {validators:[Validators.required]}),
    N: this.fb.nonNullable.control(10,{validators:[Validators.required]})
  });
  dataTotal = 0;
  constructor(
    private fb: FormBuilder,
    private modalService: NzModalService,
    private microService: MicrocontrollerService,
    private currentGreenHouse: CurrentGreenHouseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form.valueChanges.pipe(
      startWith(
        this.form.value
        ),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(x=>this.microService.search(x))
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
  onQueryParamsChange(params: NzTableQueryParams): void {
    console.log(params);
    const { pageSize, pageIndex, sort, filter } = params;
    this.changePageIndex(pageIndex);
  }
}
