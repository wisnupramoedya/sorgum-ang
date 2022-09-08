export class AppResponse
{
    message!:string;
}
export class AppTokenModel
{
    sub!:string;
    email!:string;
    given_name!:string;
    nbf!:number;
    exp!:number;
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
    data!:T[];
    nTotal!:number;
}