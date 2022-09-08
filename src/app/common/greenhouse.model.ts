import { Byte } from '@angular/compiler/src/util';
import { number } from 'echarts';
import { SearchResponse } from './app.model';

export class GreenHouseCreateForm {
  Name!: string;
  Code!: string;
  Address!: string;
  Photo!: File;
}
export class GreenHouseSearchResponse extends SearchResponse<GreenHouseDto> {}
export class GreenHouseDto {
  id!: number;
  name!: string;
  code!: string;
  address!: string;
  photo!: Byte[];
}
export class GreenHousePlantOptionDto {
  value!: number;
  display!: string;
}
export class GreenHouseParameterOptionDto extends  GreenHousePlantOptionDto{
  code!:string;
  description!:string;

}
export class GreenHouseGraphParameterRequest
{
    GreenhouseId!:number;
    ChosenDate!: Date;
    ChosenParameterIds!:number[] ;
}
export class GreenHouseGraphParameterDto
{
    parameterId!:number;
    value!:number;
    createdAt!:Date;
}
export class GreenHouseGraphParameterDtoWithLocal
{
    value!:[string,number];
    name!:string;
}


export class GreenhousePlantForm {
  PlantId!: number;
  PlantName!: string;
  N!: number;
}
export class GreenhouseIoTForm {
  Name!: string;
  Code!: string;
  Secret!: string;
}
export class InitDataGreenhouseForm {
  GreenhouseId!: number;
  Plants!: GreenhousePlantForm[];
  Iots!: GreenhouseIoTForm[];
}

export class GreenHouseDetailDto extends GreenHouseDto {
  plants!: PlantsDto[];
  iots!: IotsDto[];
}
export class PlantsDto {
  id!: number;
  n!: number;
  plantId!: number;
  name!: string;
  latinName!: string;
  condition!: PlantsConditionDto;
}
export class PlantsConditionDto
{
  rFanTime!:number;
  rFanMode!:number;
  rServoTime!:number;
  rWaterPumpTime!:number;
  rLampState!:number;
}
export class IotsDto {
  id!: number;
  name!: string;
  code!: string;
  secret!: string;
  connected!: boolean;
}
export class IoTSubmitBroadcast {
  dataIot!: IoTSubmitResultDataBroadcast[];
  createdAt!:Date;
}
export class IoTSubmitResultDataBroadcast {
  greenHousePlantId!: number;
  result!: PlantsConditionDto;
  details!: IoTSubmitDetailDataBroadcast[];
}
export class IoTSubmitDetailDataBroadcast {
  code!: string;
  value!: number;
}
export class IoTChangeStatusDto
{
    id!:number;
    isActive!:boolean;
}

export class GreenHouseCommandIoT
{
    Instruction!:GreenHouseCommandIoTDetail;
    IoTId!:number;
}
export class GreenHouseCommandIoTDetail
{
    ForceFanStop!:boolean;
    ForceHumidifierStop!:boolean;
    ForceServoStop!:boolean;
    ForceWaterPumpStop!:boolean;
    ForceLampStop!:boolean;
}
export class UserDeviceForm
{
    Browser!:string;
    Device!:string;
    Os!:string;
    DeviceKey!:string;
    GreenhouseId!:number;
}