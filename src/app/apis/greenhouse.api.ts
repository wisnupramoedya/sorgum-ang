import { prefix } from './api';
const controller ="/GreenHouse";


export const GreenHouseAPI={
    Create: prefix+controller+'/Create', //POST
    Search: prefix+controller+'/Search', //GET
    InitDataGreenHouse: prefix+controller+'/InitDataGreenHouse', //POST
    GetAllPlants: prefix+controller+'/GetAllPlants', //GET
    GetAllParameters: prefix+controller+'/GetAllParameters', //GET
    GetGreenHouseById: prefix+controller+'/GetGreenHouseById', //GET
    GraphParameter: prefix+controller+'/GraphParameter', //GET
    AddUserDevice: prefix+controller+'/AddUserDevice', //POST
};