import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {ActivatedRoute, Router, RouterModule} from "@angular/router";
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {IfRolesDirective} from "../../../../../directives/if-roles.directive";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzMessageService} from "ng-zorro-antd/message";
import {NzUploadChangeParam, NzUploadModule} from "ng-zorro-antd/upload";
import {LeafletModule} from "@asymmetrik/ngx-leaflet";
import {Icon, icon, latLng, Marker, marker, tileLayer} from "leaflet";
import {MapsService, MarkerMapping} from "../../../../../services/maps.service";
import {filter, Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-update-disease-monitor',
  templateUrl: './update-disease-monitor.component.html',
  styleUrls: ['./update-disease-monitor.component.scss'],
  standalone: true,
  imports:[
    CommonModule,
    RouterModule,
    NzFormModule,
    NzLayoutModule,
    IfRolesDirective,
    NzIconModule,
    NzSelectModule,
    NzUploadModule,
    LeafletModule
  ],
  providers:[NzNotificationService]
})
export class UpdateDiseaseMonitorComponent implements OnInit, OnDestroy {
  leafletOptions = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 13,
    center: latLng(46.879966, -121.726909)
  };

  leafletLayers: MarkerMapping[] = []
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private msg: NzMessageService,
    private mapsService: MapsService,
    private changeDetection: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( paramMap => {
      const id = parseInt(paramMap.get('id_health')!!);
      console.log(id)
    })

    this.mapsService.onMapChanged$
      .pipe(
        filter((event) => !!event),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((newLeafletLayer) => {
        this.leafletLayers = newLeafletLayer;
        this.changeDetection.detectChanges();
      })
    this.leafletLayers = this.mapsService.pushMarker([46.879966, -121.726909]);
  }

  ngOnDestroy() {
    this._unsubscribeAll.next([]);
    this._unsubscribeAll.complete();
  }

  handleChange({ file, fileList }: NzUploadChangeParam): void {
    console.log({file, fileList})
    const status = file.status;
    if (status !== 'uploading') {
      console.log(file, fileList);
    }
    if (status === 'done') {
      this.msg.success(`${file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      this.msg.error(`${file.name} file upload failed.`);
    }
  }

  addMarker() {
    const centerMap = latLng(46.879966, -121.726909);
    this.leafletLayers = this.mapsService.pushMarker(centerMap);
  }

  popMarker(index: number) {
    this.leafletLayers = this.mapsService.popMarker(index);
  }

}
