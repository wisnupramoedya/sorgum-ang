import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzNotificationModule, NzNotificationService} from "ng-zorro-antd/notification";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzMessageService} from "ng-zorro-antd/message";
import {ActivatedRoute, Router, RouterModule} from "@angular/router";
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {IfRolesDirective} from "../../../../../directives/if-roles.directive";
import {NzUploadChangeParam, NzUploadModule} from "ng-zorro-antd/upload";
import {LeafletModule} from "@asymmetrik/ngx-leaflet";
import {latLng, tileLayer} from "leaflet";
import {MapsService, MarkerMapping} from "../../../../../services/maps.service";
import {filter, Subject, takeUntil} from "rxjs";
import {RegionService} from "../../../../../api-services/region.service";

@Component({
  selector: 'app-add-disease-monitor',
  templateUrl: './add-disease-monitor.component.html',
  styleUrls: ['./add-disease-monitor.component.scss'],
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
export class AddDiseaseMonitorComponent implements OnInit, OnDestroy {
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
  }

  ngOnDestroy() {
    this.mapsService.leafletLayers = [];
    this._unsubscribeAll.next([]);
    this._unsubscribeAll.complete();
  }

  handleChange({ file, fileList }: NzUploadChangeParam): void {
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
