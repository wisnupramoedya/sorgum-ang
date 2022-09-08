import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountAPI } from '../apis/account.api';
import { 
  LoginResponse, 
  UserCreateForm, 
  UserForm, 
  UserLoginForm, 
  UserOTPPassword, 
  UserResetPassword, 
  UserUpdateForm, 
  UserUpdatePasswordForm 
} from '../common/account.model';
import { AppResponse } from '../common/app.model';
import { TokenService } from '../services/token.service';
import { UtilityService } from '../services/utility.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private httpClient:HttpClient,
    private utilityService:UtilityService,
    private tokenService:TokenService,
    private router:Router
    ) { }

  public create(data: UserCreateForm):Observable<AppResponse>{
    return this.httpClient.post<AppResponse>(AccountAPI.Create,this.utilityService.convertModelToFormData(data,null,null));
  }
  public update(data:UserUpdateForm):Observable<AppResponse>{
    return this.httpClient.post<AppResponse>(AccountAPI.Update,this.utilityService.convertModelToFormData(data,null,null));
  }
  public updatePassword(data:UserUpdatePasswordForm):Observable<AppResponse>{
    return this.httpClient.post<AppResponse>(AccountAPI.UpdatePassword,this.utilityService.convertModelToFormData(data,null,null));
  }
  public OTPForgetPassword(data:UserOTPPassword):Observable<AppResponse>{
    return this.httpClient.post<AppResponse>(AccountAPI.OTPForgetPassword,this.utilityService.convertModelToFormData(data,null,null));
  }
  public resetPassword(data:UserResetPassword):Observable<AppResponse>{
    return this.httpClient.post<AppResponse>(AccountAPI.ResetPassword,this.utilityService.convertModelToFormData(data,null,null));
  }
  public read(data:UserForm):Observable<AppResponse>{
    return this.httpClient.get<AppResponse>(AccountAPI.Read,{params:this.utilityService.convertModelToHttpParams(data)});
  }
  public login(data:UserLoginForm):Observable<LoginResponse>{
    return this.httpClient.post<LoginResponse>(AccountAPI.Login,this.utilityService.convertModelToFormData(data,null,null));
  }
  public logout():void{
    this.tokenService.clearLocalStorage();
    this.router.navigateByUrl("/",{replaceUrl:true})
  }
}
