import {Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import {ControlValueAccessor, FormsModule} from '@angular/forms';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import {ActuatorItemDto} from "../../../../../../common/actuator.model";

@Component({
  selector: 'app-actor-card',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzCardModule,
    NzSwitchModule,
    NzDescriptionsModule
  ],
  templateUrl: './actor-card.component.html',
  styleUrls: ['./actor-card.component.scss'],
})
export class ActorCardComponent implements OnInit
{
  @Input() data?: ActuatorItemDto;
  status: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.status = this.data?.StatusActuator ?? false;
  }
}
