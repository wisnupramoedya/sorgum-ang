import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-microcontroller-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './microcontroller-list.component.html',
  styleUrls: ['./microcontroller-list.component.scss']
})
export class MicrocontrollerListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
