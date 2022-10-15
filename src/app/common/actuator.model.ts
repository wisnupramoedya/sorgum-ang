import {SearchResponse} from "./app.model";

export class ActuatorType {
    Id!: number;
    Name!: string;
}

export class ActuatorItemDto {
    Id!: number;
    Name!: string;
    Description!: string;
    TypeId!: number;
    TypeName!: string;
    MicroId!: number;
    MicroName!: string;
    RegionId!: number;
    RegionName!: string;
    LandId!: number;
    LandName!: string;
    StatusActuator!: boolean;
}


export class ActuatorSearchResponse extends SearchResponse<ActuatorItemDto>{}
