import {SearchResponse} from "./app.model";

export class DiseaseItemMinimalDto {
  Id!: number;
  Name!: string;
  RegionName!: string;
  Condition!: string;
  MonitorDate!: string;
}

export class DiseaseSearchResponse extends SearchResponse<DiseaseItemMinimalDto>{}
