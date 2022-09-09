import { Component, OnInit } from '@angular/core';
import { NzI18nService, en_US } from 'ng-zorro-antd/i18n';
import { AccountService } from './api-services/account.service';
import { AppTokenModel } from './common/app.model';
import { TokenService } from './services/token.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})
export class AppComponent implements OnInit {
  title = 'sorgum';
  tokenObj:AppTokenModel|null = null;
  constructor(
    private tokenService:TokenService,
    private accountService:AccountService,
    private i18n: NzI18nService
  ){} 
  ngOnInit(): void {
    this.i18n.setLocale(en_US);
    
    this.tokenService.tokenSubs.subscribe(t=>{
      setTimeout(()=> {
        this.tokenObj=t;
      }, 2000);
    });
    this.tokenService.tokenSubs.next(this.tokenService.getTokenObject());
    
  }

  logout():void{
    this.accountService.logout();
    this.tokenService.tokenSubs.next(this.tokenService.getTokenObject());
    // this.tokenObj = this.tokenService.getTokenObject();
  }
}
