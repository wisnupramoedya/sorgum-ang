import { SearchResponse } from './app.model';


export class DescriptionPlanDetailParameterDto{
    Description!:string;
    MinValue!:number;
    MaxValue!:number;
    Color!:string;
}
export class PlanDetailParameterDto{
    ParentTypeId!:number;
    Descriptions!:DescriptionPlanDetailParameterDto[];
}
export class CreatePlanDetailDto{
    Name!:string;
    LatinName!:string;
    Description!:string;
    PlanDetailParameter!:PlanDetailParameterDto[];
}


export class DescriptionReadParameterPlanDetailDto{
    Id!:number;
    Description!:string;
    MinValue!:number;
    MaxValue!:number;
    Color!:string;
}
export class ParameterReadPlanDetailDto{
    Id!:number;
    ParentTypeId!:number;
    Descriptions!:DescriptionReadParameterPlanDetailDto[];
}
export class ReadPlanDetailDto{
    Id!:number;
    Name!:string;
    LatinName!:string;
    Description!:string;
    Parameters!:ParameterReadPlanDetailDto[];
}

export class PlanDetailSearchResponse extends SearchResponse<ReadPlanDetailDto> {}

export class UpatePlanDetailDto{
    Name!:string;
    LatinName!:string;
    Description!:string;
}
