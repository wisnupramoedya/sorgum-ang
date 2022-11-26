import {SearchResponse} from "./app.model";

export class UserItemMinimalDto {
  Id: number = 0;
  Name!: string;
  Email!: string;
  RoleId!: number;
}

export class UserSearchResponse extends SearchResponse<UserItemMinimalDto> {}

export class AddUserDto extends UserItemMinimalDto {
  InstituteId!: number;
  Password!: string;
}

export class UpdateUserDto extends UserItemMinimalDto {}
