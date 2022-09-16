import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
@Component({
  selector: 'app-mc-card',
  standalone: true,
  imports: [CommonModule, NzCardModule,NzBadgeModule,NzDescriptionsModule ],
  templateUrl: './mc-card.component.html',
  styleUrls: ['./mc-card.component.scss']
})
export class McCardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
