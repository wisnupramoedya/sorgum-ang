import { ParameterReadPlanDto } from './plan.model';

export class DescriptionCreateParameter{
    Description!:string;
    MinValue!:number;
    MaxValue!:number;
    Color!:string;
}

export class CreateParameter{
    PlanId!:number;
    ParentTypeId!:number;
    Descriptions!:DescriptionCreateParameter[];
}

export class CreateDescriptionParameter{
    PlanId!:number;
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

export class ParamSelectItem{
    Id!: number;
    Name!: string;
}
