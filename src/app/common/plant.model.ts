import { SearchResponse } from './app.model';


export class DescriptionPlantParameterDto{
    Description!:string;
    MinValue!:number;
    MaxValue!:number;
    Color!:string;
}
export class PlantParameterDto{
    GroupName!:string;
    Descriptions!:DescriptionPlantParameterDto[];
}
export class CreatePlantDto{
    Name!:string;
    LatinName!:string;
    Description!:string;
    PlantParameter!:PlantParameterDto[];
}


export class DescriptionReadParameterPlantDto{
    Id!:number;
    Description!:string;
    MinValue!:number;
    MaxValue!:number;
    Color!:string;
}
export class ParameterReadPlantDto{
    GroupName!:string;
    Descriptions!:DescriptionReadParameterPlantDto[];
}
export class ReadPlantDto{
    Id!:number;
    Name!:string;
    LatinName!:string;
    Description!:string;
    Parameters!:ParameterReadPlantDto[];
}

export class PlantSearchResponse extends SearchResponse<ReadPlantDto> {}

export class UpatePlantDto{
    Name!:string;
    LatinName!:string;
    Description!:string;
}