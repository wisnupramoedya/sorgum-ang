import { ParameterReadPlantDto } from './plant.model';

export class DescriptionCreateParameter{
    Description!:string;
    MinValue!:number;
    MaxValue!:number;
    Color!:string;
}

export class CreateParameter{
    PlantId!:number;
    GroupName!:string;
    Descriptions!:DescriptionCreateParameter[];
}

export class CreateDescriptionParameter{
    PlantId!:number;
    GroupName!:string;
    Description!:string;
    MinValue!:number;
    MaxValue!:number;
    Color!:string;
}

export class UpdateDescriptionParameter{
    Description!:string;
    MinValue!:number;
    MaxValue!:number;
    Color!:string;
}
export class UpdateParameter{
    Ids!:number[];
    GroupName!:string;
}

export class DeleteParameter{
    Ids!:number[];

}


export class ParamOverv{
    Ids!:number[]
    GNames!:string[]
}

export class ParamOverview extends ParameterReadPlantDto{
    PlantId !:number;
    PlantName!:string;
    MicroId !:number;
    Value!:number;
}