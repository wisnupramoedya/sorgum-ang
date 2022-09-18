import { SearchResponse } from './app.model';

export class RegionsItemDto {
    Id!:number;
    Name!:string;
    RegionDescription!:string;
    CordinateRegion!:string;
    NMicrocontroller!:number;
    LandId!:number;
    LandName!:string;
}
export class RegionsItemMinimalDto {
    Id!:number;
    Name!:string;
    RegionDescription!:string;
    LandId!:number;
}
export class RegionSearchResponse extends SearchResponse<RegionsItemDto>{

}
export class CreateRegionDto{
    Name!:string;
    RegionDescription!:string;
    CordinateRegion!:string;
    LandId!:number;
}

export class UpdateRegionDto{
    Name!:string;
    RegionDescription!:string;
    CordinateRegion!:string;
}
