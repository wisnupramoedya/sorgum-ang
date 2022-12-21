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
import { MiniPcItem2DTO } from 'src/app/common/minipc.model';
import { MiniPcService } from 'src/app/api-services/mini-pc.service';
import { NzSelectModule } from 'ng-zorro-antd/select';

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
    NzFormModule,
    NzSelectModule
  ],
})
export class LandCameraComponent implements OnInit, OnDestroy {
  form:FormGroup = this.fb.nonNullable.group({
    MicrocontrollerId: this.fb.nonNullable.control(0,{validators:[Validators.required]}),
    Vertical: this.fb.nonNullable.control(50),
    Horizontal: this.fb.nonNullable.control(50),
    Zoom: this.fb.nonNullable.control(0)
  });
  formMiniPc:FormGroup= this.fb.nonNullable.group({
    IdMiniPc: this.fb.nonNullable.control(0, {validators:[Validators.required]})
  });
  landId!:number;
  miniPCs: MiniPcItem2DTO[]=[];
  slider1 = 0;
  slider2 = 0;
  slider3 = 0;
  slider4 = 0;
  cc=null;
  isPinnedView =  false;
  selectedMiniPc:number = 1;
  callActive: boolean = false;
  pc!: RTCPeerConnection;
  @ViewChild("remote", {static:true}) remote!: ElementRef<HTMLVideoElement>;

  constructor(
    private fb: FormBuilder,
    private farmingHubService: FarmingHubService,
    private curGh:CurrentGreenHouseService,
    private miniPcService:MiniPcService
  ) { }

  ngOnInit(): void {
    this.curGh.chosedGreenHouse.subscribe(x=>this.landId=x);
    this.miniPcService.showMiniPcInALand(this.landId)
        .subscribe(x=>{
          this.miniPCs=x;
          this.startHubConnection();
        })
    this.formMiniPc.controls['IdMiniPc'].valueChanges
    .subscribe(x=>{
      this.hangup();
      console.log(x,"dddddddd");

      this.selectedMiniPc = x;
      this.farmingHubService.hubCon.invoke("UserRegionJoinRoom", x+"_USERREGION").then(x=>console.log("afeter invoke",x));
      this.setupWebRtc();
    });
  }
  startHubConnection():void{
    this.farmingHubService.buildHub('/FarmingHub')
    this.farmingHubService.hubCon.start()
                          .then(x=>{
                            console.log("farming hub is connected");
                            // this.farmingHubService.hubCon.invoke("UserRegionJoinRoom", this.selectedMiniPc+"_USERREGION");
                          })
                        .catch(e => console.log("farming hub is not connected",e));
    this.farmingHubService.hubCon.on('AnswerReqActivatingCamera', (data:RTCSessionDescriptionInit)=>{
      console.log("respons AnswerReqActivatingCamera",data);

        this.pc.setRemoteDescription(data)
    });
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

  async setupWebRtc() {
    const config:RTCConfiguration ={
      iceServers:[
        {urls:["stun:stun.testazure.online:3478?transport=udp"]},
        {
          urls: ["turn:turn.testazure.online:3478?transport=udp"],
          username: 'test',
          credential:"test123"
        },
      ]
    };
    try {
      this.pc = new RTCPeerConnection(config);
    } catch (error) {
      console.log(error);
      this.pc = new RTCPeerConnection(config);
    }
    console.log(this.pc);

    // this.pc.ontrack = (event:any) =>{
    //   (this.remote.nativeElement.srcObject = event.streams[0]); // use ontrack
    // }

    this.pc.addEventListener('track', function(evt) {
      if (evt.track.kind == 'video') {
          (document.getElementById('remote')! as any).srcObject = evt.streams[0];
      }
      // else {
      //     document.getElementById('audio').srcObject = evt.streams[0];
      // }
  });

    // negotiating
    this.pc.addTransceiver('video', {direction: 'recvonly'});
    this.pc.createOffer()
            .then(pc_offer=>{
              return this.pc.setLocalDescription(pc_offer)
            })
            .then(()=>{
              return new Promise<void>((resolve)=> {
                if (this.pc.iceGatheringState === 'complete') {
                    resolve();
                } else {
                    const checkState:any = ()=> {
                        if (this.pc.iceGatheringState === 'complete') {
                            this.pc.removeEventListener('icegatheringstatechange', checkState);
                            resolve();
                        }
                    }
                    this.pc.addEventListener('icegatheringstatechange', checkState);
                }
            });
            })
            .then(
              () => {
                // var offer = this.pc.localDescription;
                const dataDescription: NegotiatingRTCPCWithIdDto ={
                  sdp: this.pc.localDescription?.sdp!,
                  type: this.pc.localDescription?.type!,
                  Id: this.selectedMiniPc
                };
                console.log(dataDescription);
                this.farmingHubService.hubCon.invoke("ReqCamera",dataDescription );

              }
            )

    // end negotiating






  }

  hangup() {
    if(this.pc){
      this.pc.close();
      this.callActive = false;
    }
  }

}
