import { NgModule } from '@angular/core';
import {IfRolesDirective} from "../../directives/if-roles.directive";
import {CommonModule} from "@angular/common";
import {Role} from "../../common/account.model";

@NgModule({
  declarations: [
    IfRolesDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [IfRolesDirective]
})
export class DashboardModule {}
