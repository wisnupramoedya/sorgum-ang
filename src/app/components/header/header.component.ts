import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import {NzPopoverModule} from "ng-zorro-antd/popover";
import {NzAvatarModule} from "ng-zorro-antd/avatar";
import {NzIconModule} from "ng-zorro-antd/icon";
import {AccountService} from "../../api-services/account.service";
import {Role, User} from "../../common/account.model";
import {UserService} from "../../services/user.service";
import {IfRolesDirective} from "../../directives/if-roles.directive";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    IfRolesDirective,
    NzLayoutModule,
    NzPopoverModule,
    NzAvatarModule,
    NzIconModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      .logo-header {
        padding-left: 1em;
        padding-right:1em;
        height: 2.5em;
        background: rgba(255, 255, 255, 0.2);
        margin-top: 1em;
        margin-bottom:1em;
        float: left;
        h3 {
          text-align: center;
          color: white;
          line-height: 2em;
        }
      }

      .logo-avatar {
        background: #001529;
        border-style: none;
      }
    `,
  ],
  template: `
      <div
        *ifRoles="[roleEnum.SUPERADMIN, roleEnum.ADMIN, roleEnum.USER]"
        class="logo-avatar tw-float-right"
        nz-button
        nz-popover
        [(nzPopoverVisible)]="visible"
        nzPopoverTrigger="click"
        [nzPopoverContent]="contentTemplate"
      >
        <nz-avatar nzIcon="user"></nz-avatar>
      </div>
      <ng-template #contentTemplate>
        <div class="tw-text-center">
          <p class="tw-font-bold tw-m-0">{{ user.name }}</p>
          <p class="tw-font-light">{{ roleEnum[user.role] }}</p>
        </div>
        <a class="tw-text-black hover:tw-text-black" (click)="logout()">
          <span class="tw-mr-2" nz-icon nzType="logout" nzTheme="outline"></span>Log out
        </a>
      </ng-template>
  `,
})
export class HeaderComponent implements OnInit {
  visible: boolean = false;
  roleEnum: typeof Role = Role;

  user: User = {
    name: "",
    email: "@mail.com",
    role: 0
  }

  constructor(
    private accountService: AccountService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const user = this.userService.getUser();
    if (user) {
      this.user = user
    }
  }

  logout(): void {
    this.accountService.logout();
  }
}
