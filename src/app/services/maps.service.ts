import {Injectable} from '@angular/core';
import {Icon, icon, LatLngExpression, marker, Marker} from "leaflet";
import {BehaviorSubject} from "rxjs";

export class MarkerMapping {
  markerId!: number;
  marker!: Marker;

  constructor(id: number, marker: Marker) {
    this.markerId = id;
    this.marker = marker;
  }
}

@Injectable({
  providedIn: 'root'
})
export class MapsService {
  leafletLayers: MarkerMapping[] = [];
  onMapChanged$: BehaviorSubject<MarkerMapping[]> = new BehaviorSubject<MarkerMapping[]>([]);

  constructor() { }

  createMarker(id: number, latLng: LatLngExpression): MarkerMapping {
    return new MarkerMapping(
      id,
      marker(latLng, {
        icon: icon({
          ...Icon.Default.prototype.options,
          iconUrl: 'assets/marker-icon.png',
          iconRetinaUrl: 'assets/marker-icon-2x.png',
          shadowUrl: 'assets/marker-shadow.png'
        }),
        draggable: true
      }).on('dragend', () => {
        this.onMapChanged$.next(this.leafletLayers)
      })
    );
  }

  pushMarker(latLng: LatLngExpression): MarkerMapping[] {
    const markerMapping = this.createMarker(0, latLng);
    console.log("Before Push")
    console.log(this.leafletLayers);
    this.leafletLayers = [...this.leafletLayers, markerMapping];
    console.log("Push")
    console.log(this.leafletLayers);
    return this.leafletLayers;
  }

  popMarker(index: number) {
    console.log(index);
    console.log("POP BEFORE");
    console.log(this.leafletLayers)
    this.leafletLayers = [...this.leafletLayers.slice(0, index), ...this.leafletLayers.slice(index + 1)];
    console.log("POP AFTER");
    console.log(this.leafletLayers)
    return this.leafletLayers
  }
}
