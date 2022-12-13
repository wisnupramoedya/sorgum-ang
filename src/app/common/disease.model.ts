import {SearchResponse} from "./app.model";

export class DiseaseItemMinimalDto {
  Id!: number;
  Name!: string;
  RegionName!: string;
  Condition!: string;
  MonitorDate!: string;
}

export class DiseaseSearchResponse extends SearchResponse<DiseaseItemMinimalDto>{}

export class DiseaseLatLng {
  Latitude!: number;
  Longitude!: number;
}

export class DiseaseLink {
  Id!: string;
}

export class DetailDiseaseMonitor {
  IdDisease!: number;
  IdRegion!: number;
  IdStatus!: number;
  Cordinate: DiseaseLatLng[] = [];
  DiseaseImages: DiseaseLink[] = []
}

export class AddDiseaseMonitor extends DetailDiseaseMonitor {}
