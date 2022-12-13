import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzMessageService} from "ng-zorro-antd/message";
import {ActivatedRoute, Router, RouterModule} from "@angular/router";
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {IfRolesDirective} from "../../../../../directives/if-roles.directive";
import {LeafletModule} from "@asymmetrik/ngx-leaflet";
import {latLng, tileLayer} from "leaflet";
import {MapsService, MarkerMapping} from "../../../../../services/maps.service";
import {filter, Subject, takeUntil} from "rxjs";
import {
  UploadMultiPreviewComponent
} from "../../../../../components/form/upload/upload-multi-preview/upload-multi-preview.component";
import {FormArray, FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {UploadPathResponse} from "../../../../../common/upload.model";
import {DiseaseMonitorService} from "../../../../../api-services/disease-monitor.service";
import {AddDiseaseMonitor} from "../../../../../common/disease.model";

@Component({
  selector: 'app-add-disease-monitor',
  templateUrl: './add-disease-monitor.component.html',
  styleUrls: ['./add-disease-monitor.component.scss'],
  standalone: true,
  imports:[
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NzFormModule,
    NzLayoutModule,
    IfRolesDirective,
    NzIconModule,
    NzSelectModule,
    LeafletModule,
    UploadMultiPreviewComponent
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

  healthForm = this.fb.group({
    IdDisease: [0, Validators.required],
    IdRegion: [0, Validators.required],
    IdStatus: [0, Validators.required],
    Cordinate: this.fb.array([]),
    DiseaseImages: this.fb.array([]),
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private msg: NzMessageService,
    private mapsService: MapsService,
    private changeDetection: ChangeDetectorRef,
    public fb: FormBuilder,
    private diseaseMonitorService: DiseaseMonitorService,
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
        newLeafletLayer.forEach((value, index) => {
          this.Cordinate.at(index).patchValue({
            Latitude: value.marker.getLatLng().lat,
            Longitude: value.marker.getLatLng().lng
          })
        })
        this.changeDetection.detectChanges();
      })
  }

  get Cordinate() {
    return this.healthForm.get('Cordinate') as FormArray;
  }

  get DiseaseImages() {
    return this.healthForm.get('DiseaseImages') as FormArray;
  }

  ngOnDestroy() {
    this.mapsService.leafletLayers = [];
    this._unsubscribeAll.next([]);
    this._unsubscribeAll.complete();
  }

  addMarker() {
    const centerMap = latLng(46.879966, -121.726909);
    this.Cordinate.push(this.fb.group({
      Latitude: centerMap.lat,
      Longitude: centerMap.lng
    }))
    this.leafletLayers = this.mapsService.pushMarker(centerMap);
  }

  popMarker(index: number) {
    this.leafletLayers = this.mapsService.popMarker(index);
    this.Cordinate.removeAt(index);
  }

  addUploadToForm(values: UploadPathResponse[]) {
    values.forEach((value, index) => {
      this.DiseaseImages.push(this.fb.group({
        Id: value.Id
      }))
    })
  }

  onSubmit() {
    this.diseaseMonitorService.add(this.healthForm.value as AddDiseaseMonitor)
      .subscribe();
    console.log("DONE");
  }
}
