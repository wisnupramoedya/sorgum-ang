import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-land-microcontroller',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './land-microcontroller.component.html',
  styleUrls: ['./land-microcontroller.component.scss']
})
export class LandMicrocontrollerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
