export class DescriptionCreateParameter{
    Description!:string;
    MinValue!:number;
    MaxValue!:number;
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
}

export class UpdateDescriptionParameter{
    Description!:string;
    MinValue!:number;
    MaxValue!:number;
}
export class UpdateParameter{
    PlantId!:number;
    GroupName!:string;
}
