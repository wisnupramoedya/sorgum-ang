import {Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {UserService} from "../services/user.service";
import {Role} from "../common/account.model";

@Directive({
  selector: '[ifRoles]'
})
export class IfRolesDirective implements OnInit {
  private role!: number;
  @Input() ifRoles!: Role[];

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.role = this.userService.getRole();

    if (!this.ifRoles.some(x => x === this.role)) {
      this.viewContainerRef.clear();
    } else {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
  }
}
