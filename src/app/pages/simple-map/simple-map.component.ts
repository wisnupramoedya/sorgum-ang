import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-simple-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './simple-map.component.html',
  styleUrls: ['./simple-map.component.scss']
})
export class SimpleMapComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
