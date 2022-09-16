import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-land-sensor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './create-land-sensor.component.html',
  styleUrls: ['./create-land-sensor.component.scss']
})
export class CreateLandSensorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
