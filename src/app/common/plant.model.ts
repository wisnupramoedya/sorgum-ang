import { SearchResponse } from './app.model';


export class DescriptionPlantParameterDto{
    Description!:string;
    MinValue!:number;
    MaxValue!:number;
    Color!:string;
}
export class PlantParameterDto{
    ParentTypeId!:number;
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
    Id!:number;
    ParentTypeId!:number;
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
