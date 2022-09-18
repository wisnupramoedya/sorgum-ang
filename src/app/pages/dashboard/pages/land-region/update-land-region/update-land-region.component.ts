import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzModalModule, NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationModule, NzNotificationService } from 'ng-zorro-antd/notification';
import { RegionsItemDto, UpdateRegionDto } from 'src/app/common/region.model';
import { NzMessageService } from 'ng-zorro-antd/message';
import { RegionService } from 'src/app/api-services/region.service';
import { filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-update-land-region',
  standalone: true,
  templateUrl: './update-land-region.component.html',
  styleUrls: ['./update-land-region.component.scss'],
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
    NzNotificationModule
  ],
})
export class UpdateLandRegionComponent implements OnInit {
  @Input() region!:RegionsItemDto;
  form: FormGroup = this.fb.nonNullable.group({
    Name: this.fb.nonNullable.control('', {
      validators: [Validators.required],
    }),
    RegionDescription: this.fb.nonNullable.control('', {
      validators: [Validators.required],
    }),
    CordinateRegion: this.fb.nonNullable.control(''),
  });
  isSubmitLoading = false;

  constructor(
    private modal: NzModalRef,
    private fb: UntypedFormBuilder,
    private modalService: NzModalService,

    private msg: NzMessageService,
    private regionService:RegionService,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    const dt: UpdateRegionDto={
      CordinateRegion:this.region.CordinateRegion,
      Name:this.region.Name,
      RegionDescription:this.region.RegionDescription
    };
    this.form.patchValue(dt);
  }
  submitForm(): void {
    console.log(this.form.valid, this.form.value);
    
    if(this.form.valid){
      this.regionService.update(this.region.Id,this.form.value)
      .pipe(
        tap(()=>this.notification.create(
          'success',
          'Sukses',
          'Submit region baru berhasil.'
        ))
      ).subscribe(id=>this.modal.close(id));

    }
  }
  destroyModal(): void {
    this.modal.close();
  }
  delete():void{
    console.log('menghapus region dengan id', this.region.Id);
    
    this.modalService.confirm({
      nzTitle: 'Anda yakin ingin menghapus region ini?',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        console.log('OK');
        return this.region.Id;
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
          return this.regionService.delete(x);
      }),
      tap(()=>this.notification.create(
        'success',
        'Sukses',
        'Hapus region berhasil.'
      ))
    )
    .subscribe(x=>{
      this.modal.close(this.region.Id);
    });
  }
}
