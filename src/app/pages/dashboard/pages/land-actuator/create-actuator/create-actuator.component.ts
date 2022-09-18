import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-actuator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './create-actuator.component.html',
  styleUrls: ['./create-actuator.component.scss']
})
export class CreateActuatorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
