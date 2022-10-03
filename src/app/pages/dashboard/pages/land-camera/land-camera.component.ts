import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { CardNComponent } from 'src/app/components/card-n/card-n.component';
import { FarmingHubService } from 'src/app/api-services/farming-hub.service';
import { NegotiatingRTCPCDto, NegotiatingRTCPCWithIdDto } from 'src/app/common/camera.model';
import { CurrentGreenHouseService } from 'src/app/services/current-green-house.service';
import { MiniPcItemDTO } from 'src/app/common/minipc.model';

@Component({
  selector: 'app-land-camera',
  standalone: true,
  templateUrl: './land-camera.component.html',
  styleUrls: ['./land-camera.component.scss'],
  imports: [
    CommonModule,
    NzFormModule,
    RouterModule,
    NzCardModule,
    NzButtonModule,
    NzPaginationModule,
    NzInputModule,
    NzListModule,
    NzGridModule,
    NzUploadModule,
    NzIconModule,
    NzModalModule,
    CardNComponent,
    NzSliderModule,
    FormsModule,
    ReactiveFormsModule,
    NzPageHeaderModule,
    NzFormModule
  ],
})
export class LandCameraComponent implements OnInit, OnDestroy {
  form:FormGroup = this.fb.nonNullable.group({
    MicrocontrollerId: this.fb.nonNullable.control(0,{validators:[Validators.required]}),
    Vertical: this.fb.nonNullable.control(50),
    Horizontal: this.fb.nonNullable.control(50),
    Zoom: this.fb.nonNullable.control(0)
  });
  landId!:number;
  miniPCs: MiniPcItemDTO[]=[];
  slider1 = 0;
  slider2 = 0;
  slider3 = 0;
  slider4 = 0;
  cc=null;
  isPinnedView =  false;
  selectedMiniPc:number = 0;
  callActive: boolean = false;
  pc!: RTCPeerConnection;
  @ViewChild("remote", {static:true}) remote!: ElementRef<HTMLVideoElement>;

  constructor(
    private fb: FormBuilder,
    private farmingHubService: FarmingHubService,
    private curGh:CurrentGreenHouseService

  ) { }

  ngOnInit(): void {
    this.curGh.chosedGreenHouse.subscribe(x=>this.landId=x);
    this.farmingHubService.buildHub('/FarmingHub')
    this.farmingHubService.hubCon.start()
                          .then(x=>{
                            console.log("farming hub is connected");
                            this.farmingHubService.hubCon.invoke("UserRegionJoinRoom", this.selectedMiniPc);
                          })
                        .catch(e => console.log("farming hub is not connected",e));
    this.farmingHubService.hubCon.on('AnswerReqActivatingCamera', (data:RTCSessionDescriptionInit)=>{
        this.pc.setRemoteDescription(data)
    });
    this.setupWebRtc();
  }
  pinCamera():void{
    this.isPinnedView = !this.isPinnedView;
  }
  checkColor():void{
    console.log(this.cc);
    
  }
  public ngOnDestroy() {
    this.hangup();
  }

  setupWebRtc() {
    const config:RTCConfiguration ={
      iceServers:[
        { urls: "stun:stun.services.mozilla.com" },
        { urls: "stun:stun.l.google.com:19302" }
      ]
    };
    try {
      this.pc = new RTCPeerConnection(config);
    } catch (error) {
      console.log(error);
      this.pc = new RTCPeerConnection(config);
    }
    const dataDescription: NegotiatingRTCPCWithIdDto ={
      Data: this.pc.remoteDescription,
      Id: this.selectedMiniPc
    }
    this.farmingHubService.hubCon.invoke("ReqCamera",dataDescription );
    this.pc.ontrack = event =>
      (this.remote.nativeElement.srcObject = event.streams[0]); // use ontrack
  }

  hangup() {
    this.pc.close();
    this.callActive = false;
  }

}
