import { SearchResponse } from './app.model';


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


export class DescriptionReadParameterPlantDto{
    Id!:number;
    Description!:string;
    MinValue!:number;
    MaxValue!:number;
}
export class ParameterReadPlantDto{
    GroupName!:string;
    Descriptions!:DescriptionReadParameterPlantDto[];
}
export class ReadPlantDto{
    Id!:number;
    Name!:string;
    Code!:string;
    Description!:string;
    Parameters!:ParameterReadPlantDto[];
}

export class PlantSearchResponse extends SearchResponse<ReadPlantDto> {}