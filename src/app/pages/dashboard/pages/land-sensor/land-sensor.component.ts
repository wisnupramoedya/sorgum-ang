import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-land-sensor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './land-sensor.component.html',
  styleUrls: ['./land-sensor.component.scss']
})
export class LandSensorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
