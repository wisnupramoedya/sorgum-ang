import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-actuator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './update-actuator.component.html',
  styleUrls: ['./update-actuator.component.scss']
})
export class UpdateActuatorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
