import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IfRolesDirective} from "../../directives/if-roles.directive";

@NgModule({
  declarations: [
    IfRolesDirective
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    IfRolesDirective
  ]
})
export class HomeModule { }
