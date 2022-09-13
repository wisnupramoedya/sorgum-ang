import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sensor-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sensor-list.component.html',
  styleUrls: ['./sensor-list.component.scss']
})
export class SensorListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
