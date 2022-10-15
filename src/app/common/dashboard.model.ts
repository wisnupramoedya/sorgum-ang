export class DashboardDataDto {
  LandName!: string;
  RegionName!: string;
  MiniPcName!: string;
  MikroCount!: number;
  SensorCount!: number;
  Status!: boolean;
}

export class DashboardSensorDto {
  SensorId!: number;
  ParentTypeId!: number;
  ParentTypeName!: string;
  Values!: {Value: number}[];
}
