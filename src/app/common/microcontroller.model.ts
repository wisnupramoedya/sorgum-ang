import { SearchResponse } from './app.model';

export class MicroItemMinimalDto{
    Id!:number;
    Name!:string;
    Description!:string;
    RegionId!:number;
    RegionName!:string;
}
export class MicroItemDto{
    Id!:number;
    Name!:string;
    RegionId!:number;
    RegionName!:string;
    Description!:string;
    LandId!:number;
    LandName!:string;
    Status!:boolean;
    PlantId!:number;
    PlantName!:string;
}

export class MicrocontrollerSearchResponse extends SearchResponse<MicroItemDto>{}

export class AddMicroDto{
    Name!:string;
    Description!:string;
    RegionId!:number;
}
export class UpdateMicroDto{
    Name!:string;
    Description!:string;
    RegionId!:number;
}
export class MicrosIdenity{
    Ids!:number[];
}