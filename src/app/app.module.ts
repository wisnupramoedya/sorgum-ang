import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NgxEchartsModule } from 'ngx-echarts';
import { AuthorizeInterceptor } from './interceptors/authorize.interceptor';
import * as AllIcons from '@ant-design/icons-angular/icons';
import en from '@angular/common/locales/en';
import { registerLocaleData } from '@angular/common';
import { IconDefinition } from '@ant-design/icons-angular';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NzMessageService } from 'ng-zorro-antd/message';
registerLocaleData(en);
const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // BrowserModule,
    // AppRoutingModule,
    // NzLayoutModule,
    // NzDropDownModule,
    // HttpClientModule,
    // ServiceWorkerModule.register('ngsw-worker.js', {
    //   enabled: environment.production,
    //   // Register the ServiceWorker as soon as the application is stable
    //   // or after 30 seconds (whichever comes first).
    //   registrationStrategy: 'registerWhenStable:30000'
    // })
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NzLayoutModule,
    NzMenuModule,
    NzButtonModule,
    NzTypographyModule,
    NzIconModule.forRoot(icons),
    NgxEchartsModule.forRoot({
      echarts:()=> import('echarts')
    }),
    NzDropDownModule,
    ServiceWorkerModule.register('custom-service-worker.js', {
    // ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true },
    {provide:"mocking", useValue: environment.mocking, multi: true},
    NzMessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
