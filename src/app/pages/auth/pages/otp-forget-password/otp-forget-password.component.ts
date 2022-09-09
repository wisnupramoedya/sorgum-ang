import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
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

@Component({
  templateUrl: './otp-forget-password.component.html',
  styleUrls: ['./otp-forget-password.component.scss'],
  standalone:true,
  imports:[
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
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
export class OtpForgetPasswordComponent implements OnInit {

  form!: UntypedFormGroup;
  disabledSubmit=false;
  

  constructor(
    private fb: UntypedFormBuilder,
    private accountService:AccountService,
    private notification: NzNotificationService,
    private router: Router,
    private activatedRoute:ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm();
  }
  initForm():void{
    this.form = this.fb.group({
      Email: [null, [Validators.required]],
      Otp: [null, [Validators.required]],
      Password: [null, [Validators.required,Validators.min(3)]]
    });
  }
  submitForm(): void {
    this.disabledSubmit=true;
    this.accountService
    .resetPassword(this.form.value)
    .subscribe(
      (res: AppResponse)=>{
        this.initForm();
        this.disabledSubmit=false;
        this.notification.success("Sukses",res.message);
        this.router.navigate(["..","sign-in"],{relativeTo:this.activatedRoute});
      },
      (err:HttpErrorResponse)=>{
        this.disabledSubmit=false;
        const errMsg:AppResponse = err.error;
        this.notification.warning("Peringatan",errMsg.message);
      }
    )
  }
}
