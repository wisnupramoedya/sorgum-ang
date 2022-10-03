import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {AppTokenModel} from "../common/app.model";
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class PasswordService {
  pattern = "0123456789ABCDEFGHJKMNOPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";

  constructor() { }

  generateRandomString(length: number = 8): string {
    let randomString = '';
    let randomNumber: number;
    for (let i = 0; i < length; i++) {
      randomNumber = Math.floor(Math.random() * this.pattern.length);
      randomString += this.pattern.substring(randomNumber, randomNumber+1);
    }
    return randomString;
  }
}
