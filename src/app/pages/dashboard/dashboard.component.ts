import { Component, OnInit } from '@angular/core';
import { CurrentGreenHouseService } from 'src/app/services/current-green-house.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { SwUpdate, SwPush, SwRegistrationOptions } from '@angular/service-worker';
import { NotificationService } from 'src/app/services/notification.service';
import { environment } from 'src/environments/environment';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone:true,
  imports:[
    CommonModule,
    RouterModule
  ],
  providers:[NzNotificationService]
})
export class DashboardComponent implements OnInit {

  constructor(
    private swUp: SwUpdate,
    private swPush: SwPush,
    private notifService: NotificationService,
    private currentGHService: CurrentGreenHouseService,
    private deviceService: DeviceDetectorService,
    private nzNotifService: NzNotificationService,
    private route:ActivatedRoute
  ) { 
    
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe( paramMap => {
      const id = parseInt(paramMap.get('ghId')!!);
      this.currentGHService.chosedGreenHouse.next(id);
    })
    this.addSubscriptionNotification();
  }
  addSubscriptionNotification():void{
    if (!this.swPush.isEnabled) {
      this.nzNotifService.create('warning','Notification Dimatikan/Diblock!', 'Harap hidupkan notifikasi untuk aplikasi ini untuk menerima notifikasi.', {
        nzDuration: 2000,
      });
      return;
    }
    this.swPush.requestSubscription({
      serverPublicKey: environment.webPush.publicKey
    })
    .then(sub => {
      const key = JSON.stringify(sub);
      const ghId = this.currentGHService.getId();
      const deviceInfo = this.deviceService.getDeviceInfo();
      console.log("ghId",ghId);
      console.log({Browser:deviceInfo.browser,Device:deviceInfo.device,Os:deviceInfo.os,DeviceKey:key,GreenhouseId:ghId});
      if (ghId) {
        // this.notifService.AddSubscription(key, nik, deviceInfo.browser, deviceInfo.device, deviceInfo.os).subscribe();
        this.notifService.AddSubscription({Browser:deviceInfo.browser,Device:deviceInfo.device,Os:deviceInfo.os,DeviceKey:key,GreenhouseId:ghId}).subscribe();
      }
     })
    .catch(err => console.log(err))
    ;
  }

}
