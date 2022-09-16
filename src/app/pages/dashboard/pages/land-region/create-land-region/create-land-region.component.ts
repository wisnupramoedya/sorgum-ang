import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-land-region',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './create-land-region.component.html',
  styleUrls: ['./create-land-region.component.scss']
})
export class CreateLandRegionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
