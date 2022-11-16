import { Component, OnInit } from '@angular/core';
import {ReadPlantDto} from "../../../../common/plant.model";
import {Role} from "../../../../common/account.model";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NzModalModule, NzModalService} from "ng-zorro-antd/modal";
import {PlantService} from "../../../../api-services/plant.service";
import {Router} from "@angular/router";
import {debounceTime, distinctUntilChanged, startWith, switchMap} from "rxjs";
import {UpdatePlantComponent} from "../plant-list/update-plant/update-plant.component";
import {NzTableModule, NzTableQueryParams} from "ng-zorro-antd/table";
import {CommonModule} from "@angular/common";
import {IfRolesDirective} from "../../../../directives/if-roles.directive";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzPaginationModule} from "ng-zorro-antd/pagination";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzIconModule} from "ng-zorro-antd/icon";
import {CreateUserComponent} from "./create-user/create-user.component";
import {UserListService} from "../../../../api-services/user-list.service";
import {UserItemMinimalDto, UserSearchResponse} from "../../../../common/user.model";
import {UpdateUserComponent} from "./update-user/update-user.component";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IfRolesDirective,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzTableModule,
    NzPaginationModule,
    NzModalModule,
    NzButtonModule,
    NzIconModule
  ],
})
export class UserListComponent implements OnInit {
  data: UserItemMinimalDto[] = [];
  roleEnum: typeof Role = Role;

  form: FormGroup = this.fb.nonNullable.group({
    Search: this.fb.nonNullable.control('',{validators:[Validators.required]}),
    Page: this.fb.nonNullable.control(1, {validators:[Validators.required]}),
    N: this.fb.nonNullable.control(10,{validators:[Validators.required]})
  });

  dataTotal = 0;
  constructor(
    private fb: FormBuilder,
    private modalService: NzModalService,
    private userService: UserListService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form.valueChanges.pipe(
      startWith(
        this.form.value
      ),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(x=>this.userService.search(x))
    ).subscribe(
      (res: UserSearchResponse)=>{
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
      nzContent: CreateUserComponent,
      nzWidth:'80%'
    }).afterClose.subscribe(id=>{
      console.log(id);
      if(!!id){
        this.loadData();
      }
    })
  }
  loadData():void{
    this.userService.search(this.form.value).subscribe((res: any)=>{
      console.log(res);
      this.data = res.Data;
      this.dataTotal=res.NTotal;
    });
  }

  showModalUpdate(id:number):void{
    const dt = this.data.filter(x=>x.Id === id )[0];
    this.modalService.create({
      nzContent:UpdateUserComponent,
      nzWidth:'80%',
      nzComponentParams:{
        data: dt
      }
    }).afterClose.subscribe(id=>{
      console.log(id);
      if(!!id){
        this.loadData();
      }
    })
  }
  onQueryParamsChange(params: NzTableQueryParams): void {
    console.log(params);
    const { pageSize, pageIndex, sort, filter } = params;
    this.changePageIndex(pageIndex);
  }
}
