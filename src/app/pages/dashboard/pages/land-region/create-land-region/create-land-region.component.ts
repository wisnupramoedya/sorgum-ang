import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzModalModule, NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationModule, NzNotificationService } from 'ng-zorro-antd/notification';
import { RegionService } from 'src/app/api-services/region.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { tap } from 'rxjs';
import { PlantService } from 'src/app/api-services/plant.service';
import { ReadPlantDto } from 'src/app/common/plant.model';
import { NzSelectModule } from 'ng-zorro-antd/select';

@Component({
  selector: 'app-create-land-region',
  standalone: true,
  templateUrl: './create-land-region.component.html',
  styleUrls: ['./create-land-region.component.scss'],
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
export class CreateLandRegionComponent implements OnInit {
  @Input() land_id!:number;
  plants:ReadPlantDto[]=[];
  form: FormGroup = this.fb.nonNullable.group({
    Name: this.fb.nonNullable.control('', {
      validators: [Validators.required],
    }),
    RegionDescription: this.fb.nonNullable.control('', {
      validators: [Validators.required],
    }),
    CordinateRegion: this.fb.nonNullable.control(''),
    LandId: this.fb.nonNullable.control(0),
    PlantId: this.fb.nonNullable.control(0,{validators:[Validators.required]}),
  });
  isSubmitLoading = false;
  constructor(
    private modal: NzModalRef,
    private fb: UntypedFormBuilder,
    private msg: NzMessageService,
    private regionService:RegionService,
    private plantService:PlantService,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.plantService.showPlants().subscribe(x=>this.plants=x);
    this.form.controls['LandId'].setValue(this.land_id);
  }
  submitForm(): void {
    console.log(this.form.valid, this.form.value);

    if(this.form.valid){
      this.regionService.add(this.form.value)
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

}
