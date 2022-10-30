import { AppResponse } from './app.model';

export class UserForm
{
    Email!:string;
}
export class UserCreateForm extends UserForm
{
    Username!:string;
    Password!:string;
    ConfirmPassword!:string;
}
export class UserUpdateForm  extends  UserForm
{
    Id!:string;
    Username!:string;

}
export class UserOTPPassword extends UserForm
{
}
export class UserResetPassword  extends  UserForm
{
    Password!:string;
    Otp!:string;
}
export class UserUpdatePasswordForm
{
    Id!:string;
    OldPassword!:string;
    NewPassword!:string;

}
export class UserLoginForm  extends  UserForm
{
    Password!:string;
}
export class UserDto
{
    id!:string;
    email!:string;
}
export class NewUserEmailModel
{
    Name!:string;
    Email!:string;
}
export class UserOtpModel
{
    Name!:string;
    Email!:string;
    Otp!:string;
}
export class LoginResponse extends AppResponse
{
    accessToken!:string;
}

export class User {
  name!:string;
  email!:string;
  role!: number;
}

export enum Role {
  SUPERADMIN = 1,
  ADMIN ,
  USER  ,
}

export class UpdateUserDto {
  Name!: string;
  Email!: string;
  RoleId!: number;
}
