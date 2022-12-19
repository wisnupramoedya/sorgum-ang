import { SearchResponse } from './app.model';


export class DescriptionPlanParameterDto{
    Description!:string;
    MinValue!:number;
    MaxValue!:number;
    Color!:string;
}
export class PlanParameterDto{
    ParentTypeId!:number;
    Descriptions!:DescriptionPlanParameterDto[];
}
export class CreatePlanDto{
    Name!:string;
    LatinName!:string;
    Description!:string;
    PlanParameter!:PlanParameterDto[];
}


export class DescriptionReadParameterPlanDto{
    Id!:number;
    Description!:string;
    MinValue!:number;
    MaxValue!:number;
    Color!:string;
}
export class ParameterReadPlanDto{
    Id!:number;
    ParentTypeId!:number;
    Descriptions!:DescriptionReadParameterPlanDto[];
}
export class ReadPlanDto{
    Id!:number;
    Name!:string;
    LatinName!:string;
    Description!:string;
    Parameters!:ParameterReadPlanDto[];
}

export class PlanSearchResponse extends SearchResponse<ReadPlanDto> {}

export class UpatePlanDto{
    Name!:string;
    LatinName!:string;
    Description!:string;
}
