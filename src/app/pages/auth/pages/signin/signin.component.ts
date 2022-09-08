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
import { LoginResponse } from 'src/app/common/account.model';
import { AppResponse } from 'src/app/common/app.model';
import { TokenService } from 'src/app/services/token.service';

@Component({
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
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
export class SigninComponent implements OnInit {

  form!: UntypedFormGroup;
  disabledSubmit:boolean=false;
  

  constructor(
    private fb: UntypedFormBuilder,
    private accountService:AccountService,
    private notification: NzNotificationService,
    private router: Router,
    private tokenService:TokenService
  ) {

  }

  ngOnInit(): void {
    this.initForm();
  }
  initForm():void{
    this.form = this.fb.group({
      Email: [null, [Validators.required, Validators.email]],
      Password: [null, [Validators.required]],
    });
  }
  submitForm(): void {
    this.disabledSubmit = true;
    this.accountService
    .login(this.form.value)
    .subscribe(
      (res: LoginResponse)=>{
        this.tokenService.setItem(res.accessToken);
        this.initForm();
        this.router.navigateByUrl("/home",{replaceUrl:true});
        this.tokenService.tokenSubs.next(this.tokenService.getTokenObject());
      },
      (err:HttpErrorResponse)=>{
        this.disabledSubmit=false;
        const errMsg:AppResponse = err.error;
        this.notification.warning("Peringatan",errMsg.message);
      }
    )
  }

}
