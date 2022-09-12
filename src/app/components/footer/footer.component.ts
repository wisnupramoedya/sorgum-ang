import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzLayoutModule } from 'ng-zorro-antd/layout';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, NzLayoutModule],
  styles: [
    'nz-footer{text-align:center;padding:0.5em;font-size:0.75em;}'
  ],
  template: `
    <nz-footer>
      <div>
        <div>Dikembangkan oleh:</div>
        <div>Tim Laboratorium Manajemen Cerdas Informasi - ITS</div>
        <!-- <div>Institut Teknologi Sepuluh Nopember, Surabaya</div> -->
        <div>©2022</div>
      </div>
    </nz-footer>
  `,
})
export class FooterComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
