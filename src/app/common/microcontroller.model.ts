import { SearchResponse } from './app.model';

export class MicrocontrollerRowDto{
    id!:number;
    name!:string;
    region_id!:number;
    region_name!:string;
    land_id!:number;
    land_name!:string;
    status!:boolean;
}

export class MicrocontrollerSearchResponse extends SearchResponse<MicrocontrollerRowDto>{}

