import {Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormGroup, ReactiveFormsModule, UntypedFormBuilder, Validators} from "@angular/forms";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzModalModule, NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzListModule} from "ng-zorro-antd/list";
import {NzNotificationModule, NzNotificationService} from "ng-zorro-antd/notification";
import {NzSelectModule} from "ng-zorro-antd/select";
import {RegionsItemMinimalDto} from "../../../../../common/region.model";
import {NzMessageService} from "ng-zorro-antd/message";
import {RegionService} from "../../../../../api-services/region.service";
import {MicrocontrollerService} from "../../../../../api-services/microcontroller.service";
import {filter, switchMap, tap} from "rxjs";
import {MiniPcItemDto, UpdateMiniPcDto} from "../../../../../common/minipc.model";
import {PasswordService} from "../../../../../services/password.service";

@Component({
  selector: 'app-update-land-mini-pc',
  standalone: true,
  templateUrl: './update-land-mini-pc.component.html',
  styleUrls: ['./update-land-mini-pc.component.scss'],
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
export class UpdateLandMiniPcComponent implements OnInit {
  @Input() land_id!:number;
  @Input() data!: MiniPcItemDto;
  isSubmitLoading = false;
  passwordVisible = false;
  regions:RegionsItemMinimalDto[]=[];

  form: FormGroup = this.fb.nonNullable.group({
    Name: this.fb.nonNullable.control('', {
      validators: [Validators.required],
    }),
    Description: this.fb.nonNullable.control('', {
      validators: [Validators.required],
    }),
    MiniPcCode: this.fb.nonNullable.control('', {
      validators: [Validators.required],
    }),
    MiniPcSecret: this.fb.nonNullable.control('', {
      validators: [Validators.required],
    }),
    RegionId: this.fb.nonNullable.control(0,{
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
    private passwordService: PasswordService,
  ) { }

  ngOnInit(): void {
    this.regionService.showMinimal(this.land_id)
      .subscribe(x=>this.regions=x);
    const temp: UpdateMiniPcDto = {
      Name: this.data.Name,
      Description: this.data.Description,
      MiniPcCode: this.data.MiniPcCode,
      MiniPcSecret: this.data.MiniPcSecret,
      RegionId: this.data.RegionId
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
            'Pembaharuan Mini PC berhasil.'
          ))
        ).subscribe(()=>this.modal.close(0));

    }
  }
  destroyModal(): void {
    this.modal.close();
  }
  delete():void{
    console.log('menghapus mini PC dengan id', this.data.Id);

    this.modalService.confirm({
      nzTitle: 'Anda yakin ingin menghapus Mini PC ini?',
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
          'Hapus Mini PC berhasil.'
        ))
      )
      .subscribe(x=>{
        this.modal.close(this.data.Id);
      });
  }
  generateRandom(): void {
    this.form.controls['MiniPcSecret'].setValue(this.passwordService.generateRandomString(8));
  }
}
