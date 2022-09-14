export class DescriptionParameterPlantDto{
    Description!:string;
    MinValue!:number;
    MaxValue!:number;
}
export class ParameterPlantDto{
    GroupName!:string;
    Descriptions!:DescriptionParameterPlantDto[];
}
export class CreatePlantDto{
    Name!:string;
    Code!:string;
    Description!:string;
    Parameters!:ParameterPlantDto[];
}