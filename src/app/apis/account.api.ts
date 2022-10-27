import { prefix } from './api';
const controller ="/AccountCrud";
export const AccountAPI={
    Create: prefix+controller+'/Create', //POST
    Update: prefix+controller+'/Update', //PUT
    UpdatePassword: prefix+controller+'/UpdatePassword', //PUT
    OTPForgetPassword: prefix+controller+'/OTPForgetPassword', //POST
    ResetPassword: prefix+controller+'/ResetPassword', //POST
    Read: prefix+controller+'/Read', //GET
    Login: prefix+controller+'/Login', //POST
};
