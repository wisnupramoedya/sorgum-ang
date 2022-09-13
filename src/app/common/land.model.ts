import { SearchResponse } from './app.model';

export class LandItemDto{
    id!:number;
    name!:string;
    description!:string;
    n_region!:number;
    code!:string;
    coordinate!:string;
    photo!:string|null;
}
export class LandSearchResponse extends SearchResponse<LandItemDto> {}