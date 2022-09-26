import { ParameterReadPlantDto } from './plant.model';

export class DescriptionCreateParameter{
    Description!:string;
    MinValue!:number;
    MaxValue!:number;
    Color!:string;
}

export class CreateParameter{
    PlantId!:number;
    ParentTypeId!:number;
    Descriptions!:DescriptionCreateParameter[];
}

export class CreateDescriptionParameter{
    PlantId!:number;
    Id!:number;
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
    Id!:number;
    ParentTypeId!:number;
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

export class ParamSelectItem{
    Id!: number;
    Name!: string;
}
