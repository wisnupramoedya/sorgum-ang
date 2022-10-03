import { TestBed } from '@angular/core/testing';

import { MiniPcService } from './mini-pc.service';

describe('MiniPcService', () => {
  let service: MiniPcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MiniPcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
