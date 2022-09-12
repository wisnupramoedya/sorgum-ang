import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzLayoutModule } from 'ng-zorro-antd/layout';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, NzLayoutModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      .logo-header {
        padding-left: 1em;
        padding-right:1em;
        height: 2.5em;
        background: rgba(255, 255, 255, 0.2);
        margin-top: 1em;
        margin-bottom:1em;
        float: left;
        h3 {
          text-align: center;
          color: white;
          line-height: 2em;
        }
      }
    `,
  ],
  template: `

      <div class="logo-header">
        <h3 nz-typography>ITSMART FARMING SYSTEM</h3>
      </div>
  `,
})
export class HeaderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
