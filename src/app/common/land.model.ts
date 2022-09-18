import { SearchResponse } from './app.model';

export class LandItemMinimalDto{
    Id!:number;
    Name!:string;
    Code!:string;
}

export class LandItemDto{
    Id!:number;
    Name!:string;
    Code!:string;
    NRegion!:number;
    NMicrocontroller!:number;
    Address!:string;
    CordinateLand!:string;
    Photo!:string|null;
}
export class LandSearchResponse extends SearchResponse<LandItemDto> {}

export class CreateLandDto {
    Name!:string;
    Code!:string;
    Address!:string;
    Photo!:File;
    CordinateLand!:string;
}

export class UpdateLandDto {
    Name!:string;
    Code!:string;
    Address!:string;
    Photo!:File;
    CordinateLand!:string;
}