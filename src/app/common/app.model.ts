export class AppResponse
{
    message!:string;
}
export class AppTokenModel
{
    sub!: string;
    name!: string;
    email!: string;
    role!: string;
    nbf!: number;
    exp!: number;
}
export class CreateResponse<T> extends AppResponse{
    id!:T;
}
export class SearchRequest
{
    Search!:string;
    Page!:number;
    N!:number;
}
export class SearchResponse<T>
{
    Data!:T[];
    NTotal!:number;
}
