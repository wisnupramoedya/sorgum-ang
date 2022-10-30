import {Component, Input, OnInit} from '@angular/core';
import {MiniPcItemDto, UpdateMiniPcDto} from "../../../../../common/minipc.model";
import {RegionsItemMinimalDto} from "../../../../../common/region.model";
import {Role, UpdateUserDto} from "../../../../../common/account.model";
import {FormGroup, ReactiveFormsModule, UntypedFormBuilder, Validators} from "@angular/forms";
import {NzModalModule, NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {NzMessageService} from "ng-zorro-antd/message";
import {RegionService} from "../../../../../api-services/region.service";
import {MicrocontrollerService} from "../../../../../api-services/microcontroller.service";
import {NzNotificationModule, NzNotificationService} from "ng-zorro-antd/notification";
import {filter, switchMap, tap} from "rxjs";
import {CommonModule} from "@angular/common";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzListModule} from "ng-zorro-antd/list";
import {NzSelectModule} from "ng-zorro-antd/select";

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzModalModule,
    NzGridModule,
    NzIconModule,
    NzListModule,
    NzNotificationModule,
    NzSelectModule
  ],
})
export class UpdateUserComponent implements OnInit {
  @Input() land_id!:number;
  @Input() data!: MiniPcItemDto;
  isSubmitLoading = false;
  regions:RegionsItemMinimalDto[]=[];

  roleEnum: typeof Role = Role;

  form: FormGroup = this.fb.nonNullable.group({
    Name: this.fb.nonNullable.control('', {
      validators: [Validators.required],
    }),
    Email: this.fb.nonNullable.control('', {
      validators: [Validators.required],
    }),
    RoleId: this.fb.nonNullable.control(0, {
      validators: [Validators.required],
    }),
  });

  constructor(
    private modal: NzModalRef,
    private fb: UntypedFormBuilder,
    private msg: NzMessageService,
    private modalService: NzModalService,
    private regionService: RegionService,
    private miniPcService: MicrocontrollerService,
    private notification: NzNotificationService,
  ) { }

  ngOnInit(): void {
    this.regionService.showMinimal(this.land_id)
      .subscribe(x=>this.regions=x);
    const temp: UpdateUserDto = {
      Name: this.data.Name,
      Email: this.data.Description,
      RoleId: this.data.RegionId
    };
    this.form.patchValue(temp);
  }
  submitForm(): void {
    console.log(this.form.valid, this.form.value);

    if(this.form.valid){
      this.miniPcService.update(this.data.Id,this.form.value)
        .pipe(
          tap(()=>this.notification.create(
            'success',
            'Sukses',
            'Pembaharuan pengguna berhasil.'
          ))
        ).subscribe(()=>this.modal.close(0));

    }
  }
  destroyModal(): void {
    this.modal.close();
  }
  delete():void{
    this.modalService.confirm({
      nzTitle: 'Anda yakin ingin menghapus pengguna ini?',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        console.log('OK');
        return this.data.Id;
      },
      nzCancelText: 'No',
      nzOnCancel: () => {
        console.log('Cancel');
        return -1;
      }
    })
      .afterClose
      .pipe(
        filter(x=>x!==-1),
        switchMap(x=>{
          return this.miniPcService.delete(x);
        }),
        tap(()=>this.notification.create(
          'success',
          'Sukses',
          'Hapus pengguna berhasil.'
        ))
      )
      .subscribe(x=>{
        this.modal.close(this.data.Id);
      });
  }
}
