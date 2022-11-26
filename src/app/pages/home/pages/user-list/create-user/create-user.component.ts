import {Component, Input, OnInit} from '@angular/core';
import {RegionsItemMinimalDto} from "../../../../../common/region.model";
import {FormGroup, ReactiveFormsModule, UntypedFormBuilder, Validators} from "@angular/forms";
import {NzModalModule, NzModalRef} from "ng-zorro-antd/modal";
import {NzMessageService} from "ng-zorro-antd/message";
import {RegionService} from "../../../../../api-services/region.service";
import {MiniPcService} from "../../../../../api-services/mini-pc.service";
import {NzNotificationModule, NzNotificationService} from "ng-zorro-antd/notification";
import {PasswordService} from "../../../../../services/password.service";
import {tap} from "rxjs";
import {CommonModule} from "@angular/common";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzListModule} from "ng-zorro-antd/list";
import {NzSelectModule} from "ng-zorro-antd/select";
import {Role} from "../../../../../common/account.model";
import {Select} from "../../../../../common/form.model";
import {InstituteService} from "../../../../../api-services/institute.service";
import {IfRolesDirective} from "../../../../../directives/if-roles.directive";
import {UserListService} from "../../../../../api-services/user-list.service";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IfRolesDirective,
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
export class CreateUserComponent implements OnInit {
  @Input() land_id!:number;
  isSubmitLoading = false;
  passwordVisible = false;

  roleEnum: typeof Role = Role;
  roleKeys: string[] = Object.keys(Role).filter(x => isNaN(Number(x)));

  institutes: Select[] = [];

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
    InstituteId: this.fb.nonNullable.control(0),
    Password: this.fb.nonNullable.control('', {
      validators: [Validators.required],
    }),

  });

  constructor(
    private modal: NzModalRef,
    private fb: UntypedFormBuilder,
    private msg: NzMessageService,
    private regionService: RegionService,
    private userListService: UserListService,
    private notification: NzNotificationService,
    private passwordService: PasswordService,
    private instituteService: InstituteService
  ) { }

  ngOnInit(): void {
    this.instituteService.showForSelect()
      .subscribe(x => this.institutes = x);
    console.log(this.institutes)
  }
  submitForm(): void {
    console.log(this.form.valid, this.form.value);

    if(this.form.valid){
      this.userListService.add(this.form.value)
        .pipe(
          tap(()=>this.notification.create(
            'success',
            'Sukses',
            'Submit pengguna baru berhasil.'
          ))
        ).subscribe(id=>this.modal.close(id));

    }
  }
  destroyModal(): void {
    this.modal.close();
  }
  generateRandom(): void {
    this.form.controls['Password'].setValue(this.passwordService.generateRandomString(8));
  }
}
