import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzNotificationModule, NzNotificationService } from 'ng-zorro-antd/notification';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { AccountService } from 'src/app/api-services/account.service';
import { AppResponse } from 'src/app/common/app.model';
import { confirmPasswordCheck } from '../../validators/match-password.validator';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  standalone:true,
  imports:[
    CommonModule,
    ReactiveFormsModule,
    NzLayoutModule,
    NzMenuModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    NzInputNumberModule,
    NzTypographyModule,
    NzCheckboxModule,
    NzGridModule,
    NzNotificationModule,
    NzPopconfirmModule
  ]
})
export class SignupComponent implements OnInit {

  form!: UntypedFormGroup;
  disabledSubmit=false;

  constructor(
    private fb: UntypedFormBuilder,
    private accountService:AccountService,
    private notification: NzNotificationService,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.initForm();
  }
  initForm():void{
    this.form = this.fb.group({
      UserName: [null, [Validators.required]],
      Password: [null, [Validators.required, Validators.min(3)]],
      ConfirmPassword:[null, [Validators.required]],
      Email:[null,[Validators.required, Validators.email]]
    },{validators:confirmPasswordCheck});
  }
  submitForm(): void {
    this.disabledSubmit=true;
    this.accountService
    .create(this.form.value)
    .subscribe(
      (res: AppResponse)=>{
        this.initForm();
        this.disabledSubmit=false;
        this.notification.success("Sukses",res.message);
      },
      (err:HttpErrorResponse)=>{
        this.disabledSubmit=false;
        const errMsg:AppResponse = err.error;
        this.notification.warning("Peringatan",errMsg.message);
      }
    )
  }
  //TODO Validator Email User
}
