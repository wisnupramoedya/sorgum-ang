import { ParameterReadPlanDetailDto } from './plan-detail.model';

export class DescriptionCreateParameter{
    Description!:string;
    MinValue!:number;
    MaxValue!:number;
    Color!:string;
}

export class CreateParameter{
    PlanDetailId!:number;
    ParentTypeId!:number;
    Descriptions!:DescriptionCreateParameter[];
}

export class CreateDescriptionParameter{
    PlanDetailId!:number;
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
